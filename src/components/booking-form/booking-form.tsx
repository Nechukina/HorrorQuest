import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BookingData, BookingFormFields, BookingPostData, FormField } from '../../types/booking-form';
import { DateSlot } from '../../const';
import { getQuest } from '../../store/quest/quest.selectors';
import { getCurrentQuest } from '../../store/booking/booking.selectors';
import Loader from '../loader/loader';
import SlotsList from './slots-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postBookingQuestAction } from '../../store/api-actions';

type FormFieldKey = keyof BookingFormFields;

const bookingFields: Record<FormFieldKey, FormField> = {
  name: {
    type: 'text',
    label: 'Ваше имя',
    placeholder: 'Имя',
    pattern: /^.{1,15}$/,
    errorText: 'От 1 до 15 символов'
  },
  tel: {
    type: 'tel',
    label: 'Контактный телефон',
    placeholder: 'Телефон',
    pattern: /^(\+[7]|[8])?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){8,12}\d$/,
    errorText: 'Пожалуйста, введите корректный номер телефона'
  },
  person: {
    type: 'number',
    label: 'Количество участников',
    placeholder: 'Количество участников',
    pattern: /[^0-9]/i,
    errorText: ''
  }
};

const bookingFieldKeys = Object.keys(bookingFields) as FormFieldKey[];

function BookingForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: {
      errors
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

  bookingFields.person.pattern = new RegExp(`^([${minPersonCount}-${maxPersonCount}])$`);
  bookingFields.person.errorText = `Количество участников от ${minPersonCount} до ${maxPersonCount}`;

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

    dispatch(postBookingQuestAction(bookingPostData));
    // eslint-disable-next-line no-console
    console.log(bookingPostData);
    resetBookingFormData();
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
        {bookingFieldKeys.map((key: FormFieldKey) => {
          const { type, label, placeholder, pattern, errorText } = bookingFields[key];

          return (
            <div className="custom-input login-form__input" key={key}>
              <label className="custom-input__label" htmlFor={key}>{label}</label>
              <input
                {...register(`${key}`, {
                  required: 'Это обязательное поле',
                  pattern: {
                    value: pattern,
                    message: errorText
                  }
                })}
                type={type}
                id={key}
                name={key}
                placeholder={placeholder}
              />
              {errors[key] && <p>{errors[key]?.message}</p>}
            </div>
          );
        })}
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
        type="submit"
      >
        Забронировать
      </button>
    </form>
  );
}

export default BookingForm;
