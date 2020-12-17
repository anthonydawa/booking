

const BookingList = ({booking}) => (
    <div className="card">
        <div className="card-body d-flex justify-content-between">
           <p>{booking.name}</p>
           <p>{booking.price}</p>
        </div>
    </div>
)

export default BookingList