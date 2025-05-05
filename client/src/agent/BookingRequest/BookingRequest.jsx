import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCheck,
  FaTimes,
  FaFilter,
  FaTimesCircle,
} from "react-icons/fa";
import "./BookingRequest.css";

// Sample booking requests data with Pexels images
const sampleBookingRequests = [
  {
    _id: "1",
    property: {
      _id: "p1",
      title: "Luxury Apartment in Downtown",
      propertyType: "Apartment",
      location: {
        area: "Downtown",
        city: "New York"
      },
      pricePerMonth: 50000,
      description: "A beautiful luxury apartment with stunning city views and modern amenities.",
      images: "https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      availabilityStatus: true
    },
    customer: {
      _id: "c1",
      name: "John Doe",
      email: "john@example.com"
    }
  },
  {
    _id: "2",
    property: {
      _id: "p2",
      title: "Modern Villa with Pool",
      propertyType: "Villa",
      location: {
        area: "Beverly Hills",
        city: "Los Angeles"
      },
      pricePerMonth: 75000,
      description: "A spacious villa with private pool and garden, perfect for families.",
      images: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      availabilityStatus: true
    },
    customer: {
      _id: "c2",
      name: "Jane Smith",
      email: "jane@example.com"
    }
  },
  {
    _id: "3",
    property: {
      _id: "p3",
      title: "Cozy Studio Apartment",
      propertyType: "Studio",
      location: {
        area: "Midtown",
        city: "Chicago"
      },
      pricePerMonth: 35000,
      description: "A cozy studio apartment in a prime location, perfect for singles.",
      images: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      availabilityStatus: true
    },
    customer: {
      _id: "c3",
      name: "Mike Johnson",
      email: "mike@example.com"
    }
  },
  {
    _id: "4",
    property: {
      _id: "p1",
      title: "Luxury Apartment in Downtown",
      propertyType: "Apartment",
      location: {
        area: "Downtown",
        city: "New York"
      },
      pricePerMonth: 50000,
      description: "A beautiful luxury apartment with stunning city views and modern amenities.",
      images: "https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      availabilityStatus: true
    },
    customer: {
      _id: "c1",
      name: "John Doe",
      email: "john@example.com"
    }
  },
  {
    _id: "5",
    property: {
      _id: "p2",
      title: "Modern Villa with Pool",
      propertyType: "Villa",
      location: {
        area: "Beverly Hills",
        city: "Los Angeles"
      },
      pricePerMonth: 75000,
      description: "A spacious villa with private pool and garden, perfect for families.",
      images: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      availabilityStatus: true
    },
    customer: {
      _id: "c2",
      name: "Jane Smith",
      email: "jane@example.com"
    }
  },
  {
    _id: "6",
    property: {
      _id: "p3",
      title: "Cozy Studio Apartment",
      propertyType: "Studio",
      location: {
        area: "Midtown",
        city: "Chicago"
      },
      pricePerMonth: 35000,
      description: "A cozy studio apartment in a prime location, perfect for singles.",
      images: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      availabilityStatus: true
    },
    customer: {
      _id: "c3",
      name: "Mike Johnson",
      email: "mike@example.com"
    }
  },
  {
    _id: "7",
    property: {
      _id: "p1",
      title: "Luxury Apartment in Downtown",
      propertyType: "Apartment",
      location: {
        area: "Downtown",
        city: "New York"
      },
      pricePerMonth: 50000,
      description: "A beautiful luxury apartment with stunning city views and modern amenities.",
      images: "https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      availabilityStatus: true
    },
    customer: {
      _id: "c1",
      name: "John Doe",
      email: "john@example.com"
    }
  },
  {
    _id: "8",
    property: {
      _id: "p2",
      title: "Modern Villa with Pool",
      propertyType: "Villa",
      location: {
        area: "Beverly Hills",
        city: "Los Angeles"
      },
      pricePerMonth: 75000,
      description: "A spacious villa with private pool and garden, perfect for families.",
      images: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      availabilityStatus: true
    },
    customer: {
      _id: "c2",
      name: "Jane Smith",
      email: "jane@example.com"
    }
  },
  {
    _id: "9",
    property: {
      _id: "p3",
      title: "Cozy Studio Apartment",
      propertyType: "Studio",
      location: {
        area: "Midtown",
        city: "Chicago"
      },
      pricePerMonth: 35000,
      description: "A cozy studio apartment in a prime location, perfect for singles.",
      images: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      availabilityStatus: true
    },
    customer: {
      _id: "c3",
      name: "Mike Johnson",
      email: "mike@example.com"
    }
  },
  {
    _id: "10",
    property: {
      _id: "p1",
      title: "Luxury Apartment in Downtown",
      propertyType: "Apartment",
      location: {
        area: "Downtown",
        city: "New York"
      },
      pricePerMonth: 50000,
      description: "A beautiful luxury apartment with stunning city views and modern amenities.",
      images: "https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      availabilityStatus: true
    },
    customer: {
      _id: "c1",
      name: "John Doe",
      email: "john@example.com"
    }
  },
  {
    _id: "11",
    property: {
      _id: "p2",
      title: "Modern Villa with Pool",
      propertyType: "Villa",
      location: {
        area: "Beverly Hills",
        city: "Los Angeles"
      },
      pricePerMonth: 75000,
      description: "A spacious villa with private pool and garden, perfect for families.",
      images: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      availabilityStatus: true
    },
    customer: {
      _id: "c2",
      name: "Jane Smith",
      email: "jane@example.com"
    }
  },
  {
    _id: "12",
    property: {
      _id: "p3",
      title: "Cozy Studio Apartment",
      propertyType: "Studio",
      location: {
        area: "Midtown",
        city: "Chicago"
      },
      pricePerMonth: 35000,
      description: "A cozy studio apartment in a prime location, perfect for singles.",
      images: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      availabilityStatus: true
    },
    customer: {
      _id: "c3",
      name: "Mike Johnson",
      email: "mike@example.com"
    }
  },
  {
    _id: "13",
    property: {
      _id: "p1",
      title: "Luxury Apartment in Downtown",
      propertyType: "Apartment",
      location: {
        area: "Downtown",
        city: "New York"
      },
      pricePerMonth: 50000,
      description: "A beautiful luxury apartment with stunning city views and modern amenities.",
      images: "https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      availabilityStatus: true
    },
    customer: {
      _id: "c1",
      name: "John Doe",
      email: "john@example.com"
    }
  },
  {
    _id: "14",
    property: {
      _id: "p2",
      title: "Modern Villa with Pool",
      propertyType: "Villa",
      location: {
        area: "Beverly Hills",
        city: "Los Angeles"
      },
      pricePerMonth: 75000,
      description: "A spacious villa with private pool and garden, perfect for families.",
      images: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      availabilityStatus: true
    },
    customer: {
      _id: "c2",
      name: "Jane Smith",
      email: "jane@example.com"
    }
  },
  {
    _id: "15",
    property: {
      _id: "p3",
      title: "Cozy Studio Apartment",
      propertyType: "Studio",
      location: {
        area: "Midtown",
        city: "Chicago"
      },
      pricePerMonth: 35000,
      description: "A cozy studio apartment in a prime location, perfect for singles.",
      images: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      availabilityStatus: true
    },
    customer: {
      _id: "c3",
      name: "Mike Johnson",
      email: "mike@example.com"
    }
  },
  {
    _id: "16",
    property: {
      _id: "p1",
      title: "Luxury Apartment in Downtown",
      propertyType: "Apartment",
      location: {
        area: "Downtown",
        city: "New York"
      },
      pricePerMonth: 50000,
      description: "A beautiful luxury apartment with stunning city views and modern amenities.",
      images: "https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      availabilityStatus: true
    },
    customer: {
      _id: "c1",
      name: "John Doe",
      email: "john@example.com"
    }
  },
  {
    _id: "17",
    property: {
      _id: "p2",
      title: "Modern Villa with Pool",
      propertyType: "Villa",
      location: {
        area: "Beverly Hills",
        city: "Los Angeles"
      },
      pricePerMonth: 75000,
      description: "A spacious villa with private pool and garden, perfect for families.",
      images: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      availabilityStatus: true
    },
    customer: {
      _id: "c2",
      name: "Jane Smith",
      email: "jane@example.com"
    }
  },
  {
    _id: "18",
    property: {
      _id: "p3",
      title: "Cozy Studio Apartment",
      propertyType: "Studio",
      location: {
        area: "Midtown",
        city: "Chicago"
      },
      pricePerMonth: 35000,
      description: "A cozy studio apartment in a prime location, perfect for singles.",
      images: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      availabilityStatus: true
    },
    customer: {
      _id: "c3",
      name: "Mike Johnson",
      email: "mike@example.com"
    }
  }
];

const BookingRequest = () => {
  const [bookingRequests, setBookingRequests] = useState(sampleBookingRequests);
  const [dateSort, setDateSort] = useState(null);
  const [priceSort, setPriceSort] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const itemsPerPage = 6;
  const totalPages = Math.ceil(bookingRequests.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bookingRequests.slice(indexOfFirstItem, indexOfLastItem);

  const handleRequestAction = (requestId, action) => {
    // Remove the request from the list when approved or rejected
    setBookingRequests(prevRequests => 
      prevRequests.filter(request => request._id !== requestId)
    );
  };

  const handleSort = (type, value) => {
    if (value === "all") {
      setDateSort(null);
      setPriceSort(null);
    } else {
      if (type === "date") {
        setDateSort(value);
      } else if (type === "price") {
        setPriceSort(value);
      }
    }

    let sortedRequests = [...bookingRequests];
    
    // Apply date sorting if selected
    if (dateSort) {
      sortedRequests.sort((a, b) => {
        if (dateSort === "latest") {
          return new Date(b._id) - new Date(a._id);
        } else if (dateSort === "oldest") {
          return new Date(a._id) - new Date(b._id);
        }
        return 0;
      });
    }

    // Apply price sorting if selected
    if (priceSort) {
      sortedRequests.sort((a, b) => {
        if (priceSort === "high") {
          return b.property.pricePerMonth - a.property.pricePerMonth;
        } else if (priceSort === "low") {
          return a.property.pricePerMonth - b.property.pricePerMonth;
        }
        return 0;
      });
    }
    
    setBookingRequests(sortedRequests);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="booking-request-container">
      <div className="booking-request-header-section">
        <h1>Booking Requests</h1>
        
      </div>

      <div className="booking-request-grid">
        {currentItems.map((request) => (
          <div
            key={request._id}
            className="booking-request-card"
          >
            <div className="booking-request-image-container">
              <img
                src={request.property.images}
                alt={request.property.title}
                className="booking-request-image"
              />
              <div className={`booking-request-properties-status-badge ${request.property.availabilityStatus ? 'available' : 'booked'}`}>
                {request.property.availabilityStatus ? 'Available' : 'Booked'}
              </div>
            </div>
            <div className="booking-request-details">
              <h2 className="booking-request-details-card-title">
                {request.property.title}
              </h2>

              <div className="booking-request-customer">
                <h3>Requested by:</h3>
                <p>{request.customer.name}</p>
                <p>{request.customer.email}</p>
              </div>

              <div className="booking-request-actions">
                <button
                  className="booking-request-approve"
                  onClick={() => handleRequestAction(request._id, "approve")}
                >
                  <FaCheck /> Approve
                </button>
                <button
                  className="booking-request-reject"
                  onClick={() => handleRequestAction(request._id, "reject")}
                >
                  <FaTimes /> Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {bookingRequests.length === 0 && (
        <div className="booking-request-empty">
          <h3>No booking requests</h3>
          <p>You don't have any pending booking requests at the moment.</p>
        </div>
      )}

      {bookingRequests.length > 0 && (
        <div className="booking-request-pagination">
          <button
            className="booking-request-pagination-button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`booking-request-pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="booking-request-pagination-button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingRequest;
