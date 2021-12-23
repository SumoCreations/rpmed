import { AsyncSubmitHandler } from '@sumocreations/forms'
import React from 'react'
import { LoginForm, LoginFormValues } from '../Forms'

const styles = {
  container: 'flex flex-row h-screen w-screen',
  content: 'flex-shrink-0 flex-grow py-4 px-8',
  accentOne: 'w-0 sm:w-4 lg:w-1/4 bg-primary-default',
  accentTwo: 'w-0 sm:w-8 lg:w-1/3 bg-accent-default',
}

export interface LoginScreenProps {}

export const LoginScreen: React.FC = () => {
  const handleSubmit: AsyncSubmitHandler<LoginFormValues> = async (values) => {
    console.log(values)
    return undefined
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm onSubmit={handleSubmit} />
      </div>
      <div className={styles.accentOne} />
      <div className={styles.accentTwo} />
    </div>
  )
}
