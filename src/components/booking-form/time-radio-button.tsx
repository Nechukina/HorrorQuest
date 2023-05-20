import { DateSlot } from '../../const';
import { Slot } from '../../types/booking';
import { formatTime } from '../../utils/format-time';

type TimeRadioButtonProps = {
  day: DateSlot;
  slot: Slot;
  onDateChange: (date: DateSlot, time: string) => void;

}

function TimeRadioButton({day, slot, onDateChange}: TimeRadioButtonProps): JSX.Element {
  const { time, isAvailable } = slot;

  return (
    <label className="custom-radio booking-form__date">
      <input
        type="radio"
        id={`${day}${formatTime(time)}`}
        name="date"
        value={`${day}${formatTime(time)}`}
        disabled={!isAvailable}
        onChange={() => onDateChange(day, time)}
        required
      />
      <span className="custom-radio__label">{time}</span>
    </label>
  );
}

export default TimeRadioButton;
