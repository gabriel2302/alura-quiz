import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GithubCorner from '../src/components/GithubCorner';
import QuizBackground from '../src/components/QuizBackground';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Link from '../src/components/Link';

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

  const handleFormat = (text) =>
    text
      .replace(/\//g, '')
      .replace('https:', '')
      .replace('vercel.app')
      .split('.');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ duration: 0.5, delay: 0 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
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
        <Widget
          as={motion.section}
          transition={{ duration: 0.5, delay: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Quiz da galera</h1>
            <ul>
              {db.external.map((quiz) => {
                const [project, user] = handleFormat(quiz);
                return (
                  <li>
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${project}___${user}`}
                      key={quiz}
                    >
                      {`${project}/${user}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.footer}
          transition={{ duration: 0.5, delay: 1.0 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GithubCorner projectUrl="https://github.com/gabriel2302" />
    </QuizBackground>
  );
}
