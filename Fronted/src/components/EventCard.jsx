import { useNavigate } from "react-router-dom";

function EventCard({ id, title, date, location, price, image }) {
  const navigate = useNavigate();

  const eventImage = image
    ? image.replace(".jpg", ".jpeg")
    : "/images/default.jpeg";

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">

        <img
          src={eventImage}
          className="card-img-top"
          alt={title}
          style={{
            height: "220px",
            objectFit: "cover"
          }}
          onError={(e) => {
            console.log("Image not found:", eventImage);
          }}
        />

        <div className="card-body">
          <h4>{title}</h4>

          <p className="text-muted">
            📅 {date}
          </p>

          <p>
            📍 {location}
          </p>

          <h5 className="text-success">
            ₹{price}
          </h5>

          <button
            className="btn btn-warning w-100 mt-3"
            onClick={() => navigate(`/booking/${id}`)}
          >
            Book Now
          </button>
        </div>

      </div>
    </div>
  );
}

export default EventCard;