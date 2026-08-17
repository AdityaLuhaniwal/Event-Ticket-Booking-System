import { useNavigate } from "react-router-dom";

function EventCard({ id, title, date, location, price, image }) {

  const navigate = useNavigate();

  const eventImages = {
    "IPL Final 2026": "/images/ipl.jpeg",
    "Arijit Singh Live": "/images/arijit.jpeg",
    "Movie Premiere Night": "/images/movie.jpeg",
    "Zakir Khan Live": "/images/zakir.jpeg",
    "A.R. Rahman Live": "/images/arrahman.jpeg",
    "Diljit Dosanjh Live": "/images/diljit.jpeg",
    "Anubhav Singh Bassi Live": "/images/bassi.jpeg",
    "India International Trade Fair": "/images/tradefair.jpeg"
  };

  const eventImage = eventImages[title] || image;

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