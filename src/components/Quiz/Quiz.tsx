import { FC, useState } from 'react'
import styles from './Quiz.module.scss'

const questions = [
  {
    title: 'React is...?',
    variants: ['library', 'framework', 'application'],
    correct: 0,
  },
  {
    title: 'The component is...?',
    variants: [
      'application',
      'part of an application or page',
      'what I don`t know what is',
    ],
    correct: 1,
  },
  {
    title: 'What is JSX?',
    variants: [
      'This is plain HTML',
      'This is a function',
      'This is the same HTML, but with the ability to execute JS code',
    ],
    correct: 2,
  },
]

type GameProps = {
  question: {
    title: string
    variants: string[]
    correct: number
  }
  step: number
  onClickGetVariant: (index: number) => void
}

const Game: FC<GameProps> = ({ question, step, onClickGetVariant }) => {
  const percentage = Math.round((step / questions.length) * 100)

  return (
    <>
      <div className={styles.progress}>
        <div
          style={{ width: `${percentage}%` }}
          className={styles.progress__inner}
        ></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {question.variants.map((text, i) => (
          <li onClick={() => onClickGetVariant(i)} key={text}>
            {text}
          </li>
        ))}
      </ul>
    </>
  )
}

type ResultProps = {
  correct: number
}

const Result: FC<ResultProps> = ({ correct }) => {
  return (
    <div className={styles.result}>
      <img
        src='https://cdn-icons-png.flaticon.com/512/2278/2278992.png'
        alt='congratulations'
      />
      <h2>
        You guessed {correct} answer from {questions.length}
      </h2>

      <button onClick={() => window.location.reload()}>Try again</button>
    </div>
  )
}

export const Quiz: FC = () => {
  const [step, setStep] = useState(0)
  const [correct, setCorrect] = useState(0)
  const question = questions[step]

  const onClickGetVariant = (index: number) => {
    setStep(step + 1)

    if (index === question.correct) {
      setCorrect(correct + 1)
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {step !== questions.length ? (
          <Game
            question={question}
            step={step}
            onClickGetVariant={onClickGetVariant}
          />
        ) : (
          <Result correct={correct} />
        )}
      </div>
    </div>
  )
}
