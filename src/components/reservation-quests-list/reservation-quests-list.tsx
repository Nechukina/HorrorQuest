import { getReservationQuests } from '../../store/reservation-quests/reservation-quests.selectors';
import ReservationQuestCard from '../reservation-quest-card/reservation-quest-card';
import { useAppSelector } from '../../hooks';


function ReservationQuestList(): JSX.Element {
  const reservationQuests = useAppSelector(getReservationQuests);

  if (!reservationQuests.length) {
    return <p style={{textAlign: 'center', fontSize: 24}}>У Вас пока нет забронированных квестов</p>;
  }

  return (
    <div className="cards-grid">
      {reservationQuests.map((reservationQuest) => (
        <ReservationQuestCard
          key={reservationQuest.id}
          reservationQuest={reservationQuest}
        />
      ))}
    </div>
  );
}

export default ReservationQuestList;
