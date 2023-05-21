import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BookingData, BookingFormFields, BookingPostData } from '../../types/booking-form';
import { DateSlot } from '../../const';
import { getQuest } from '../../store/quest/quest.selectors';
import { getCurrentQuest } from '../../store/booking/booking.selectors';
import Loader from '../loader/loader';
import SlotsList from './slots-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postBookingQuestAction } from '../../store/api-actions';


function BookingForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: {
      errors , isValid
    },
    reset
  } = useForm<BookingFormFields>({
    mode: 'onChange'
  });
  const dispatch = useAppDispatch();

  const [currentDate, setCurrentDate] = useState<DateSlot | null>(null);
  const [currentTime, setCurrentTime] = useState('');
  const [withChildren, setWithChildren] = useState(false);

  const onDateChange = useCallback((date: DateSlot, time: string): void => {
    setCurrentDate(date);
    setCurrentTime(time);
  }, []);

  const quest = useAppSelector(getQuest);
  const currentQuestPlace = useAppSelector(getCurrentQuest);

  if (!quest || !currentQuestPlace) {
    return <Loader />;
  }

  const [minPersonCount, maxPersonCount] = quest.peopleMinMax;


  const resetBookingFormData = () => {
    setCurrentDate(null);
    setCurrentTime('');
    setWithChildren(false);
    reset();
  };

  const onSubmit: SubmitHandler<BookingFormFields> = (data) => {
    const bookingData: BookingData = {
      contactPerson: data.name,
      phone: data.tel,
      peopleCount: +data.person,
      date: currentDate as DateSlot,
      time: currentTime,
      withChildren: withChildren,
      placeId: currentQuestPlace.id
    };

    const bookingPostData: BookingPostData = {
      questId: quest.id,
      bookingData: bookingData
    };

    dispatch(postBookingQuestAction({...bookingPostData, onSuccess: resetBookingFormData}));
  };

  return (
    <form
      className="booking-form"
      action="https://echo.htmlacademy.ru/"
      method="post"
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Выбор даты и времени</legend>
        <SlotsList
          onDateChange={onDateChange}
          slots={currentQuestPlace.slots}
        />
      </fieldset>
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Контактная информация</legend>

        <div className="custom-input login-form__input" key="name">
          <label className="custom-input__label" htmlFor="name">Ваше имя</label>
          <input {...register('name', {
            required: 'Это обязательное поле',
            pattern: {
              value: /^.{1,15}$/,
              message: 'От 1 до 15 символов'
            }
          })}
          type="text"
          id="name"
          name="name"
          placeholder="Имя"
          />
          {errors['name'] && <p>{errors['name']?.message}</p>}
        </div>
        <div className="custom-input login-form__input" key="tel">
          <label className="custom-input__label" htmlFor="tel">Контактный телефон</label>
          <input
            {...register('tel', {
              required: 'Это обязательное поле',
              pattern: {
                value: /^(\+[7]|[8])?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){8,12}\d$/,
                message: 'Пожалуйста, введите корректный номер мобильного телефона  в формате +7(000)0000000'
              }
            })}
            type="tel"
            id="tel"
            name="tel"
            placeholder='+7(123)456-78-90'
          />
          {errors['tel'] && <p>{errors['tel']?.message}</p>}
        </div>
        <div className="custom-input login-form__input" key="person">
          <label className="custom-input__label" htmlFor="person">Количество участников</label>
          <input
            {...register('person', {
              required: 'Это обязательное поле',
              pattern: {
                value:new RegExp(`^([${minPersonCount}-${maxPersonCount}])$`),
                message: `Количество участников от ${minPersonCount} до ${maxPersonCount}`
              }
            })}
            type="number"
            id="person"
            name="person"
            placeholder='Количество участников'
          />
          {errors['person'] && <p>{errors['person']?.message}</p>}
        </div>

        <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
          <input
            type="checkbox"
            id="children"
            name="children"
            onChange={() => setWithChildren(!withChildren)}
          />
          <span className="custom-checkbox__icon">
            <svg width="20" height="17" aria-hidden="true">
              <use xlinkHref="#icon-tick"></use>
            </svg>
          </span>
          <span className="custom-checkbox__label">Со&nbsp;мной будут дети</span>
        </label>
      </fieldset>
      <button
        className="btn btn--accent btn--cta booking-form__submit"
        type="submit" disabled={!isValid}
      >
        Забронировать
      </button>
    </form>
  );
}

export default BookingForm;
