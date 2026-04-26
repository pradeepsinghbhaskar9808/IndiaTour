"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Tour } from "@/data/tours";
import { TOURS } from "@/data/tours";

export type DemoRole = "user" | "admin";
export type UserStatus = "active" | "inactive";
export type BookingStatus = "pending" | "approved" | "rejected";
export type PaymentStatus = "paid" | "pending" | "refunded";
export type ReviewStatus = "approved" | "pending";

type StoredUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: DemoRole;
  status: UserStatus;
  joinedAt: string;
  phone: string;
  location: string;
  wishlist: string[];
};

export type DemoUser = Omit<StoredUser, "password">;

export type DemoBooking = {
  id: string;
  userId: string;
  userName: string;
  tourSlug: string;
  tourTitle: string;
  destination: string;
  departureDate: string;
  adults: number;
  children: number;
  totalTravelers: number;
  totalAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
};

export type DemoPayment = {
  id: string;
  bookingId: string;
  userId: string;
  userName: string;
  amount: number;
  method: "Card" | "UPI" | "Bank Transfer";
  status: PaymentStatus;
  paidAt: string;
};

export type DemoReview = {
  id: string;
  userId: string;
  userName: string;
  tourSlug: string;
  tourTitle: string;
  rating: number;
  comment: string;
  status: ReviewStatus;
  createdAt: string;
};

type DemoStore = {
  users: StoredUser[];
  bookings: DemoBooking[];
  payments: DemoPayment[];
  reviews: DemoReview[];
};

type LoginResult =
  | { ok: true; user: DemoUser }
  | { ok: false; error: string };

type WishlistResult =
  | { ok: true; wished: boolean }
  | { ok: false; error: string };

type BookingInput = {
  tour: Tour;
  selectedDay: number;
  adults: number;
  children: number;
};

type BookingResult =
  | { ok: true; booking: DemoBooking }
  | { ok: false; error: string };

type AuthContextValue = {
  currentUser: DemoUser | null;
  isReady: boolean;
  users: DemoUser[];
  bookings: DemoBooking[];
  payments: DemoPayment[];
  reviews: DemoReview[];
  login: (email: string, password: string) => LoginResult;
  signup: (fullName: string, email: string, password: string) => LoginResult;
  logout: () => void;
  toggleWishlist: (tour: Tour) => WishlistResult;
  createBooking: (input: BookingInput) => BookingResult;
  toggleUserStatus: (userId: string) => void;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  updatePaymentStatus: (paymentId: string, status: PaymentStatus) => void;
  updateReviewStatus: (reviewId: string, status: ReviewStatus) => void;
  deleteReview: (reviewId: string) => void;
};

export const DEMO_ACCOUNTS = {
  user: {
    label: "Demo User",
    email: "traveler@touriza.demo",
    password: "travel123",
  },
  admin: {
    label: "Demo Admin",
    email: "admin@touriza.demo",
    password: "admin123",
  },
} as const;

const STORE_KEY = "touriza-demo-store";
const SESSION_KEY = "touriza-demo-session";

const AuthContext = createContext<AuthContextValue | null>(null);

function stripPassword(user: StoredUser): DemoUser {
  const { password: _password, ...publicUser } = user;
  return publicUser;
}

function getTourMeta(slug: string) {
  return TOURS.find((tour) => tour.slug === slug);
}

function buildInitialStore(): DemoStore {
  const adminUser: StoredUser = {
    id: "admin-1",
    name: "Aditi Sharma",
    email: DEMO_ACCOUNTS.admin.email,
    password: DEMO_ACCOUNTS.admin.password,
    role: "admin",
    status: "active",
    joinedAt: "2026-01-05",
    phone: "+91 98765 43210",
    location: "Jaipur, India",
    wishlist: [],
  };

  const travelerOne: StoredUser = {
    id: "user-1",
    name: "Arjun Mehta",
    email: DEMO_ACCOUNTS.user.email,
    password: DEMO_ACCOUNTS.user.password,
    role: "user",
    status: "active",
    joinedAt: "2026-02-10",
    phone: "+91 98989 12121",
    location: "Delhi, India",
    wishlist: [TOURS[0]?.slug, TOURS[2]?.slug].filter(Boolean),
  };

  const travelerTwo: StoredUser = {
    id: "user-2",
    name: "Neha Kapoor",
    email: "neha@touriza.demo",
    password: "travel123",
    role: "user",
    status: "active",
    joinedAt: "2026-02-26",
    phone: "+91 98111 22334",
    location: "Mumbai, India",
    wishlist: [TOURS[1]?.slug].filter(Boolean),
  };

  const travelerThree: StoredUser = {
    id: "user-3",
    name: "Kabir Singh",
    email: "kabir@touriza.demo",
    password: "travel123",
    role: "user",
    status: "inactive",
    joinedAt: "2026-03-18",
    phone: "+91 98222 33445",
    location: "Bengaluru, India",
    wishlist: [],
  };

  const bookings: DemoBooking[] = [
    {
      id: "booking-1",
      userId: travelerOne.id,
      userName: travelerOne.name,
      tourSlug: TOURS[0]?.slug ?? "discover-ancient-egypt",
      tourTitle: TOURS[0]?.title ?? "Discover the Mysteries of Ancient Egypt",
      destination: TOURS[0]?.location ?? "Egypt",
      departureDate: "2026-05-27",
      adults: 2,
      children: 1,
      totalTravelers: 3,
      totalAmount: 2600,
      status: "approved",
      paymentStatus: "paid",
      createdAt: "2026-04-11T09:30:00.000Z",
    },
    {
      id: "booking-2",
      userId: travelerOne.id,
      userName: travelerOne.name,
      tourSlug: TOURS[2]?.slug ?? "serengeti-big-5-safari",
      tourTitle: TOURS[2]?.title ?? "Serengeti Big 5 Safari",
      destination: TOURS[2]?.location ?? "Tanzania",
      departureDate: "2026-05-29",
      adults: 2,
      children: 0,
      totalTravelers: 2,
      totalAmount: 1000,
      status: "pending",
      paymentStatus: "paid",
      createdAt: "2026-04-19T13:10:00.000Z",
    },
    {
      id: "booking-3",
      userId: travelerTwo.id,
      userName: travelerTwo.name,
      tourSlug: TOURS[1]?.slug ?? "cape-to-kruger-south-africa",
      tourTitle: TOURS[1]?.title ?? "Cape to Kruger: The Best of South Africa",
      destination: TOURS[1]?.location ?? "South Africa",
      departureDate: "2026-05-28",
      adults: 1,
      children: 1,
      totalTravelers: 2,
      totalAmount: 1600,
      status: "approved",
      paymentStatus: "paid",
      createdAt: "2026-04-21T08:20:00.000Z",
    },
    {
      id: "booking-4",
      userId: travelerThree.id,
      userName: travelerThree.name,
      tourSlug: TOURS[4]?.slug ?? "morocco-sahara-to-souks",
      tourTitle: TOURS[4]?.title ?? "Colors of Morocco: Sahara to Souks",
      destination: TOURS[4]?.location ?? "Morocco",
      departureDate: "2026-05-30",
      adults: 2,
      children: 0,
      totalTravelers: 2,
      totalAmount: 2000,
      status: "rejected",
      paymentStatus: "refunded",
      createdAt: "2026-04-08T16:50:00.000Z",
    },
  ];

  const payments: DemoPayment[] = [
    {
      id: "payment-1",
      bookingId: "booking-1",
      userId: travelerOne.id,
      userName: travelerOne.name,
      amount: 2600,
      method: "Card",
      status: "paid",
      paidAt: "2026-04-11T09:35:00.000Z",
    },
    {
      id: "payment-2",
      bookingId: "booking-2",
      userId: travelerOne.id,
      userName: travelerOne.name,
      amount: 1000,
      method: "UPI",
      status: "paid",
      paidAt: "2026-04-19T13:15:00.000Z",
    },
    {
      id: "payment-3",
      bookingId: "booking-3",
      userId: travelerTwo.id,
      userName: travelerTwo.name,
      amount: 1600,
      method: "Card",
      status: "paid",
      paidAt: "2026-04-21T08:25:00.000Z",
    },
    {
      id: "payment-4",
      bookingId: "booking-4",
      userId: travelerThree.id,
      userName: travelerThree.name,
      amount: 2000,
      method: "Bank Transfer",
      status: "refunded",
      paidAt: "2026-04-08T17:00:00.000Z",
    },
  ];

  const reviews: DemoReview[] = [
    {
      id: "review-1",
      userId: travelerOne.id,
      userName: travelerOne.name,
      tourSlug: TOURS[0]?.slug ?? "discover-ancient-egypt",
      tourTitle: TOURS[0]?.title ?? "Discover the Mysteries of Ancient Egypt",
      rating: 5,
      comment:
        "Everything from hotel stays to the local guide felt smooth, premium, and thoughtfully planned.",
      status: "approved",
      createdAt: "2026-04-14T10:40:00.000Z",
    },
    {
      id: "review-2",
      userId: travelerTwo.id,
      userName: travelerTwo.name,
      tourSlug: TOURS[1]?.slug ?? "cape-to-kruger-south-africa",
      tourTitle: TOURS[1]?.title ?? "Cape to Kruger: The Best of South Africa",
      rating: 4,
      comment:
        "The safari experience was amazing and the booking support team was very responsive.",
      status: "pending",
      createdAt: "2026-04-22T07:10:00.000Z",
    },
    {
      id: "review-3",
      userId: travelerOne.id,
      userName: travelerOne.name,
      tourSlug: TOURS[2]?.slug ?? "serengeti-big-5-safari",
      tourTitle: TOURS[2]?.title ?? "Serengeti Big 5 Safari",
      rating: 5,
      comment:
        "Our guide knew every corner of the park and the whole trip felt like a once-in-a-lifetime adventure.",
      status: "approved",
      createdAt: "2026-04-23T12:45:00.000Z",
    },
  ];

  return {
    users: [adminUser, travelerOne, travelerTwo, travelerThree],
    bookings,
    payments,
    reviews,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [store, setStore] = useState<DemoStore | null>(null);
  const [sessionUserId, setSessionUserId] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedStore = window.localStorage.getItem(STORE_KEY);
    const savedSession = window.localStorage.getItem(SESSION_KEY);

    const initialStore = savedStore
      ? (JSON.parse(savedStore) as DemoStore)
      : buildInitialStore();

    setStore(initialStore);
    setSessionUserId(savedSession);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady || !store) return;
    window.localStorage.setItem(STORE_KEY, JSON.stringify(store));
  }, [isReady, store]);

  useEffect(() => {
    if (!isReady) return;

    if (sessionUserId) {
      window.localStorage.setItem(SESSION_KEY, sessionUserId);
      return;
    }

    window.localStorage.removeItem(SESSION_KEY);
  }, [isReady, sessionUserId]);

  const currentUser = useMemo(() => {
    if (!store || !sessionUserId) return null;
    const foundUser = store.users.find((user) => user.id === sessionUserId);
    return foundUser ? stripPassword(foundUser) : null;
  }, [sessionUserId, store]);

  useEffect(() => {
    if (!store || !sessionUserId) return;
    const sessionUser = store.users.find((user) => user.id === sessionUserId);
    if (!sessionUser || sessionUser.status === "inactive") {
      setSessionUserId(null);
    }
  }, [sessionUserId, store]);

  const login = useCallback(
    (email: string, password: string): LoginResult => {
      if (!store) {
        return { ok: false, error: "The demo account store is still loading." };
      }

      const matchedUser = store.users.find(
        (user) => user.email.toLowerCase() === email.trim().toLowerCase(),
      );

      if (!matchedUser || matchedUser.password !== password) {
        return {
          ok: false,
          error: "We couldn't match that travel login. Try one of the demo accounts below.",
        };
      }

      if (matchedUser.status === "inactive") {
        return {
          ok: false,
          error: "This demo account is inactive right now. Please use another account.",
        };
      }

      setSessionUserId(matchedUser.id);
      return { ok: true, user: stripPassword(matchedUser) };
    },
    [store],
  );

  const signup = useCallback(
    (fullName: string, email: string, password: string): LoginResult => {
      if (!store) {
        return { ok: false, error: "The demo account store is still loading." };
      }

      const trimmedName = fullName.trim();
      const normalizedEmail = email.trim().toLowerCase();

      if (trimmedName.length < 2) {
        return {
          ok: false,
          error: "Please enter your full traveler name before creating the account.",
        };
      }

      if (
        store.users.some(
          (user) => user.email.toLowerCase() === normalizedEmail,
        )
      ) {
        return {
          ok: false,
          error: "That email already has a travel account. Please log in instead.",
        };
      }

      const newUser: StoredUser = {
        id: `user-${Date.now()}`,
        name: trimmedName,
        email: normalizedEmail,
        password,
        role: "user",
        status: "active",
        joinedAt: new Date().toISOString().slice(0, 10),
        phone: "+91 90000 00000",
        location: "New traveler",
        wishlist: [],
      };

      setStore((currentStore) =>
        currentStore
          ? { ...currentStore, users: [newUser, ...currentStore.users] }
          : currentStore,
      );
      setSessionUserId(newUser.id);

      return { ok: true, user: stripPassword(newUser) };
    },
    [store],
  );

  const logout = useCallback(() => {
    setSessionUserId(null);
  }, []);

  const toggleWishlist = useCallback(
    (tour: Tour): WishlistResult => {
      if (!currentUser) {
        return {
          ok: false,
          error: "Please log in as a traveler to save tours to your wishlist.",
        };
      }

      if (currentUser.role !== "user") {
        return {
          ok: false,
          error: "Wishlist is available for traveler accounts only in this demo.",
        };
      }

      let wished = false;

      setStore((currentStore) => {
        if (!currentStore) return currentStore;

        const updatedUsers = currentStore.users.map((user) => {
          if (user.id !== currentUser.id) return user;

          const alreadySaved = user.wishlist.includes(tour.slug);
          wished = !alreadySaved;

          return {
            ...user,
            wishlist: alreadySaved
              ? user.wishlist.filter((slug) => slug !== tour.slug)
              : [...user.wishlist, tour.slug],
          };
        });

        return { ...currentStore, users: updatedUsers };
      });

      return { ok: true, wished };
    },
    [currentUser],
  );

  const createBooking = useCallback(
    ({ tour, selectedDay, adults, children }: BookingInput): BookingResult => {
      if (!currentUser) {
        return {
          ok: false,
          error: "Please log in as a traveler to confirm a demo booking.",
        };
      }

      if (currentUser.role !== "user") {
        return {
          ok: false,
          error: "Bookings can only be created from a traveler account in this demo.",
        };
      }

      if (adults + children === 0) {
        return {
          ok: false,
          error: "Select at least one traveler before continuing.",
        };
      }

      const bookingId = `booking-${Date.now()}`;
      const paymentId = `payment-${Date.now()}`;
      const totalAmount = adults * tour.price + children * Math.round(tour.price * 0.6);
      const departureDate = `2026-05-${String(selectedDay).padStart(2, "0")}`;

      const booking: DemoBooking = {
        id: bookingId,
        userId: currentUser.id,
        userName: currentUser.name,
        tourSlug: tour.slug,
        tourTitle: tour.title,
        destination: tour.location,
        departureDate,
        adults,
        children,
        totalTravelers: adults + children,
        totalAmount,
        status: "pending",
        paymentStatus: "paid",
        createdAt: new Date().toISOString(),
      };

      const payment: DemoPayment = {
        id: paymentId,
        bookingId,
        userId: currentUser.id,
        userName: currentUser.name,
        amount: totalAmount,
        method: "Card",
        status: "paid",
        paidAt: new Date().toISOString(),
      };

      setStore((currentStore) =>
        currentStore
          ? {
              ...currentStore,
              bookings: [booking, ...currentStore.bookings],
              payments: [payment, ...currentStore.payments],
            }
          : currentStore,
      );

      return { ok: true, booking };
    },
    [currentUser],
  );

  const toggleUserStatus = useCallback((userId: string) => {
    setStore((currentStore) => {
      if (!currentStore) return currentStore;

      return {
        ...currentStore,
        users: currentStore.users.map((user) =>
          user.id === userId && user.role !== "admin"
            ? {
                ...user,
                status: user.status === "active" ? "inactive" : "active",
              }
            : user,
        ),
      };
    });
  }, []);

  const updateBookingStatus = useCallback(
    (bookingId: string, status: BookingStatus) => {
      setStore((currentStore) => {
        if (!currentStore) return currentStore;

        const updatedBookings = currentStore.bookings.map((booking) =>
          booking.id === bookingId
            ? {
                ...booking,
                status,
                paymentStatus: status === "rejected" ? "refunded" : booking.paymentStatus,
              }
            : booking,
        );

        const updatedPayments = currentStore.payments.map((payment) =>
          payment.bookingId === bookingId
            ? {
                ...payment,
                status: status === "rejected" ? "refunded" : payment.status,
              }
            : payment,
        );

        return {
          ...currentStore,
          bookings: updatedBookings,
          payments: updatedPayments,
        };
      });
    },
    [],
  );

  const updatePaymentStatus = useCallback(
    (paymentId: string, status: PaymentStatus) => {
      setStore((currentStore) => {
        if (!currentStore) return currentStore;

        const payment = currentStore.payments.find((item) => item.id === paymentId);
        if (!payment) return currentStore;

        return {
          ...currentStore,
          payments: currentStore.payments.map((item) =>
            item.id === paymentId ? { ...item, status } : item,
          ),
          bookings: currentStore.bookings.map((booking) =>
            booking.id === payment.bookingId
              ? { ...booking, paymentStatus: status }
              : booking,
          ),
        };
      });
    },
    [],
  );

  const updateReviewStatus = useCallback((reviewId: string, status: ReviewStatus) => {
    setStore((currentStore) => {
      if (!currentStore) return currentStore;

      return {
        ...currentStore,
        reviews: currentStore.reviews.map((review) =>
          review.id === reviewId ? { ...review, status } : review,
        ),
      };
    });
  }, []);

  const deleteReview = useCallback((reviewId: string) => {
    setStore((currentStore) => {
      if (!currentStore) return currentStore;

      return {
        ...currentStore,
        reviews: currentStore.reviews.filter((review) => review.id !== reviewId),
      };
    });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      currentUser,
      isReady,
      users: store?.users.map(stripPassword) ?? [],
      bookings: store?.bookings ?? [],
      payments: store?.payments ?? [],
      reviews: store?.reviews ?? [],
      login,
      signup,
      logout,
      toggleWishlist,
      createBooking,
      toggleUserStatus,
      updateBookingStatus,
      updatePaymentStatus,
      updateReviewStatus,
      deleteReview,
    }),
    [
      createBooking,
      currentUser,
      deleteReview,
      isReady,
      login,
      logout,
      signup,
      store,
      toggleUserStatus,
      toggleWishlist,
      updateBookingStatus,
      updatePaymentStatus,
      updateReviewStatus,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}

export function getTourTitleFromSlug(slug: string) {
  return getTourMeta(slug)?.title ?? "Saved Tour";
}
