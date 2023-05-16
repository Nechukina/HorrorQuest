import { useForm } from 'react-hook-form';
import { ValidationPattern } from '../../const';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/user-process';


function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm<AuthData>({
    mode: 'onBlur'
  });

  const onSubmit = (data: AuthData) => {
    // eslint-disable-next-line
    console.log(data);
    reset();
    dispatch(loginAction(data));
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)}
      className="login-form" action="https://echo.htmlacademy.ru/" method="post"
    >
      <div className="login-form__inner-wrapper">
        <h1 className="title title--size-s login-form__title">Вход</h1>
        <div className="login-form__inputs">
          <div className="custom-input login-form__input">
            <label className="custom-input__label" htmlFor="email">E&nbsp;&ndash;&nbsp;mail</label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Заполните поле',
                pattern: ValidationPattern.Email
              }
              )}
              placeholder="Адрес электронной почты"
            />
            {errors?.email && <p>Введите валидный email</p>}
          </div>
          <div className="custom-input login-form__input">
            <label className="custom-input__label" htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              {...register('password', {
                required: 'Заполните поле',
                minLength:{
                  value: 3,
                  message: 'Минимум 3 символа'},
                pattern: ValidationPattern.Password
              }
              )}
              placeholder="Пароль"
            />
            {errors?.password && <p>{errors?.password?.message || 'Пароль должен содержать минимум одну букву и цифру'}</p>}
          </div>
        </div>
        <button className="btn btn--accent btn--general login-form__submit" type="submit" disabled={!isValid}>Войти</button>
      </div>
    </form>
  );
}

export default LoginForm;
