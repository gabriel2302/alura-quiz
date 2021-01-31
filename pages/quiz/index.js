import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';

import db from '../../db.json';
import Widget from '../../src/components/Widget';
import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import QuizLogo from '../../src/components/QuizLogo';
import Button from '../../src/components/Button';
import AlternativeForm from '../../src/components/AlternativeForm';

import animationData from '../../src/animation/loading.json';

function ResultWidget({ results, name }) {
  return (
    <Widget>
      <Widget.Header>{`Parabéns: ${name}`}</Widget.Header>
      <Widget.Content>
        <p>
          {'Você acertou '}
          {results.reduce((somatoriaAtual, resultAtual) => {
            const isAcerto = resultAtual === true;
            if (isAcerto) {
              return somatoriaAtual + 1;
            }
            return somatoriaAtual;
          }, 0)}
          {' perguntas'}
        </p>
        <ul>
          {results.map((result, index) => (
            <li>
              {`# ${index + 1} - Resultado: `}
              {result === true ? 'Acertou' : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return <Lottie options={defaultOptions} width={300} height={300} />;
}

function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsQuestionSubmited(true);
    setTimeout(() => {
      addResult(isCorrect);
      onSubmit();
      setIsQuestionSubmited(false);
      setSelectedAlternative(undefined);
    }, 2 * 1000);
  };

  return (
    <Widget>
      <Widget.Header>
        <h3>
          <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
        </h3>
      </Widget.Header>
      <img
        src={question.image}
        alt="Descrição"
        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
      />

      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>

        <AlternativeForm onSubmit={handleSubmit}>
          {question.alternatives.map((alternative, index) => {
            const alternativeId = `alternative_${index}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === index;
            return (
              <Widget.Topic
                key={alternativeId}
                htmlFor={alternativeId}
                as="label"
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  id={alternativeId}
                  type="radio"
                  name={questionId}
                  style={{ display: 'none' }}
                  onChange={() => {
                    setSelectedAlternative(index);
                  }}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
        </AlternativeForm>
      </Widget.Content>
    </Widget>
  );
}

export default function QuizPage({ name }) {
  const [screenState, setScreenState] = useState('LOAD');
  const [results, setResults] = useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  useEffect(() => {
    setTimeout(() => {
      setScreenState('QUIZ');
    }, 1 * 1000);
  }, []);

  const addResult = (result) => {
    setResults([...results, result]);
  };

  const handleSubmit = () => {
    const nextQuestion = questionIndex + 1;

    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState('RESULT');
    }
  };

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === 'QUIZ' && (
          <QuestionWidget
            question={question}
            totalQuestions={totalQuestions}
            questionIndex={questionIndex}
            onSubmit={handleSubmit}
            addResult={addResult}
          />
        )}
        {screenState === 'LOAD' && <LoadingWidget />}
        {screenState === 'RESULT' && (
          <ResultWidget results={results} name={name} />
        )}
      </QuizContainer>
    </QuizBackground>
  );
}

export async function getServerSideProps(context) {
  const { name } = context.query;

  return {
    props: {
      name,
    },
  };
}
