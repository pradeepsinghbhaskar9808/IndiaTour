"use client";
import { useState, type Dispatch, type SetStateAction } from "react";
import Link from "next/link";
import TourCard from "@/components/TourCard";
import { TOURS, DESTINATIONS } from "@/data/tours";

const ACTIVITY_OPTIONS = ["Safari", "Historical", "Wildlife", "Cultural"];
const TRIP_TYPE_OPTIONS = ["Adventure", "Heritage", "Luxury", "Beach"];
const TAG_OPTIONS = ["Safari", "Cultural", "Historical", "Wildlife"];
const DIFFICULTY_OPTIONS = ["Easy", "Medium", "Hard"];

function getDifficulty(tour: (typeof TOURS)[number]) {
  if (tour.days <= 5 && tour.price <= 1000) return "Easy";
  if (tour.days <= 7) return "Medium";
  return "Hard";
}

function matchesTextField(tour: (typeof TOURS)[number], value: string) {
  const normalized = value.toLowerCase();
  return [
    tour.title,
    tour.location,
    tour.country,
    tour.tag,
    tour.description,
  ].some((field) => field.toLowerCase().includes(normalized));
}

function matchesKeyword(tour: (typeof TOURS)[number], keyword: string) {
  const normalized = keyword.toLowerCase();
  return [
    tour.tag,
    tour.title,
    tour.description,
    tour.location,
    tour.country,
  ].some((field) => field.toLowerCase().includes(normalized));
}

function toggleSelected(
  value: string,
  setSelected: Dispatch<SetStateAction<string[]>>,
) {
  setSelected((current) =>
    current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value],
  );
}

export default function ToursPage() {
  const [search, setSearch] = useState("");
  const [destinationFilter, setDestinationFilter] =
    useState("All Destinations");
  const [activityFilter, setActivityFilter] = useState("All Activities");
  const [priceRange, setPriceRange] = useState(3000);
  const [durationRange, setDurationRange] = useState(15);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    [],
  );
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedTripTypes, setSelectedTripTypes] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(
    [],
  );

  const selectedDestinationMatch = (tour: (typeof TOURS)[number]) =>
    selectedDestinations.length === 0 ||
    selectedDestinations.some(
      (value) =>
        tour.country === value ||
        tour.location.toLowerCase().includes(value.toLowerCase()),
    );

  const selectedActivityMatch = (tour: (typeof TOURS)[number]) =>
    selectedActivities.length === 0 ||
    selectedActivities.some((value) => matchesKeyword(tour, value));

  const selectedTripTypeMatch = (tour: (typeof TOURS)[number]) =>
    selectedTripTypes.length === 0 ||
    selectedTripTypes.some((value) => matchesKeyword(tour, value));

  const selectedTagMatch = (tour: (typeof TOURS)[number]) =>
    selectedTags.length === 0 ||
    selectedTags.some((value) => matchesKeyword(tour, value));

  const selectedDifficultyMatch = (tour: (typeof TOURS)[number]) =>
    selectedDifficulties.length === 0 ||
    selectedDifficulties.includes(getDifficulty(tour));

  const filteredTours = TOURS.filter((tour) => {
    const matchesSearch =
      search.trim() === "" || matchesTextField(tour, search);

    const matchesTopDestination =
      destinationFilter === "All Destinations" ||
      tour.country === destinationFilter ||
      tour.location.toLowerCase().includes(destinationFilter.toLowerCase());

    const matchesTopActivity =
      activityFilter === "All Activities" ||
      matchesKeyword(tour, activityFilter);

    return (
      matchesSearch &&
      tour.price <= priceRange &&
      tour.days <= durationRange &&
      matchesTopDestination &&
      matchesTopActivity &&
      selectedDestinationMatch(tour) &&
      selectedActivityMatch(tour) &&
      selectedTripTypeMatch(tour) &&
      selectedTagMatch(tour) &&
      selectedDifficultyMatch(tour)
    );
  });

  const getOptionCount = (matcher: (tour: (typeof TOURS)[number]) => boolean) =>
    TOURS.filter(matcher).length;

  return (
    <>
      <div className="page-hero">
        <div
          className="page-hero-bg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&q=80')",
          }}
        />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <p className="breadcrumb">
            <Link href="/">Home</Link> › Tours
          </p>
          <h1 className="page-title">Tours</h1>
        </div>
      </div>

      <div
        style={{
          maxWidth: 700,
          margin: "-26px auto 0",
          padding: "0 5%",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div className="search-strip">
          <select
            className="strip-select"
            value={destinationFilter}
            onChange={(e) => setDestinationFilter(e.target.value)}
          >
            <option>All Destinations</option>
            {DESTINATIONS.map((d) => (
              <option key={d.name}>{d.name}</option>
            ))}
          </select>

          <select
            className="strip-select"
            value={activityFilter}
            onChange={(e) => setActivityFilter(e.target.value)}
          >
            <option>All Activities</option>
            {ACTIVITY_OPTIONS.map((activity) => (
              <option key={activity}>{activity}</option>
            ))}
          </select>

          <button
            type="button"
            className="btn-primary"
            style={{ padding: "10px 22px", borderRadius: 10 }}
            onClick={() => {
              setSearch(search.trim());
            }}
          >
            Search
          </button>
        </div>
      </div>

      <div className="section">
        <div className="tours-page-layout">
          <aside className="filter-sidebar">
            <div className="sidebar-title">Filter By</div>

            <div className="filter-group">
              <h4>Destination</h4>
              {DESTINATIONS.map((d) => (
                <div key={d.name} className="filter-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedDestinations.includes(d.name)}
                      onChange={() =>
                        toggleSelected(d.name, setSelectedDestinations)
                      }
                    />
                    {d.name}
                  </label>
                  <span className="filter-count">
                    {getOptionCount(
                      (tour) =>
                        tour.country === d.name ||
                        tour.location
                          .toLowerCase()
                          .includes(d.name.toLowerCase()),
                    )}
                  </span>
                </div>
              ))}
            </div>

            <div className="filter-group">
              <h4>Price</h4>
              <div className="range-wrap">
                <input
                  type="range"
                  min={500}
                  max={3000}
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                />
                <div className="range-labels">
                  <span>$500</span>
                  <span>${priceRange.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="filter-group">
              <h4>Duration</h4>
              <div className="range-wrap">
                <input
                  type="range"
                  min={3}
                  max={15}
                  value={durationRange}
                  onChange={(e) => setDurationRange(Number(e.target.value))}
                />
                <div className="range-labels">
                  <span>3 Days</span>
                  <span>{durationRange} Days</span>
                </div>
              </div>
            </div>

            <div className="filter-group">
              <h4>Activities</h4>
              {ACTIVITY_OPTIONS.map((activity) => (
                <div key={activity} className="filter-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedActivities.includes(activity)}
                      onChange={() =>
                        toggleSelected(activity, setSelectedActivities)
                      }
                    />
                    {activity}
                  </label>
                  <span className="filter-count">
                    {getOptionCount((tour) => matchesKeyword(tour, activity))}
                  </span>
                </div>
              ))}
            </div>

            <div className="filter-group">
              <h4>Trip Types</h4>
              {TRIP_TYPE_OPTIONS.map((type) => (
                <div key={type} className="filter-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedTripTypes.includes(type)}
                      onChange={() =>
                        toggleSelected(type, setSelectedTripTypes)
                      }
                    />
                    {type}
                  </label>
                  <span className="filter-count">
                    {getOptionCount((tour) => matchesKeyword(tour, type))}
                  </span>
                </div>
              ))}
            </div>

            <div className="filter-group">
              <h4>Tags</h4>
              {TAG_OPTIONS.map((tag) => (
                <div key={tag} className="filter-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag)}
                      onChange={() => toggleSelected(tag, setSelectedTags)}
                    />
                    {tag}
                  </label>
                  <span className="filter-count">
                    {getOptionCount((tour) => matchesKeyword(tour, tag))}
                  </span>
                </div>
              ))}
            </div>

            <div className="filter-group">
              <h4>Difficulties</h4>
              {DIFFICULTY_OPTIONS.map((difficulty) => (
                <div key={difficulty} className="filter-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedDifficulties.includes(difficulty)}
                      onChange={() =>
                        toggleSelected(difficulty, setSelectedDifficulties)
                      }
                    />
                    {difficulty}
                  </label>
                  <span className="filter-count">
                    {getOptionCount(
                      (tour) => getDifficulty(tour) === difficulty,
                    )}
                  </span>
                </div>
              ))}
            </div>
          </aside>

          <div>
            <div className="search-bar-wrap">
              <span className="search-bar-icon">🔍</span>
              <input
                className="search-bar-input"
                placeholder="Search tours by name or destination..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="tours-meta-row">
              <span className="tours-count">
                Showing {filteredTours.length} tour
                {filteredTours.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="tours-grid">
              {filteredTours.map((tour, index) => (
                <TourCard key={tour.id} tour={tour} animDelay={index * 0.05} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
