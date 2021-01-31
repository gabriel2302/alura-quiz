import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GithubCorner from '../src/components/GithubCorner';
import QuizBackground from '../src/components/QuizBackground';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  const handleSubmitForm = (e) => {
    e.preventDefault();
    router.push(`/quiz?name=${name}`);
  };

  const handleSubmit = useCallback((e) => {
    setName(e.target.value);
  }, []);

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>Javascript Quiz</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={handleSubmitForm}>
              <Input placeholder="Diz ai seu nome" onChange={handleSubmit} />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <h1>Quiz da galera</h1>
            <p>Hello World</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GithubCorner projectUrl="https://github.com/gabriel2302" />
    </QuizBackground>
  );
}
