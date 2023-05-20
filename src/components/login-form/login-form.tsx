import { useForm } from 'react-hook-form';
import { AuthData } from '../../types/user-process';
import { loginAction } from '../../store/api-actions';
import { STEP_BACK, ValidationPattern } from '../../const';
import { useAppDispatch } from '../../hooks';
import { useNavigate } from 'react-router-dom';


function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AuthData>();

  const onSubmit = (data: AuthData) => {
    dispatch(loginAction({...data, onSuccess: reset}));
  };

  return (
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
        <button onClick={() => navigate(STEP_BACK)} className="btn btn--accent btn--general login-form__submit" type="submit" >Войти</button>
      </div>
    </form>
  );
}

export default LoginForm;
