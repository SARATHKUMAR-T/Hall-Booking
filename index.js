const express = require("express");

// Initailization
const app = express();

// middlware
app.use(express.json());

// HallData

const hallData = [
  {
    id: "1",
    numberOfSeats: 100,
    amenities: ["Ac", "chairs", "discolights"],
    price: 5000,
    ifBooked: true,
    customerName: "Sanjay",
    date: "05-feb-2022",
    startTime: "10-feb-2022 at 12PM",
    endTime: "11-feb-2020 at 11am",
    RoomId: 201,
    RoomName: "Duplex",
  },
  {
    id: "2",
    numberOfSeats: 100,
    amenities: ["Ac", "chairs", "discolights"],
    price: 5000,
    ifBooked: false,
    customerName: "",
    date: "",
    startTime: "",
    endTime: "",
    RoomId: 202,
    RoomName: "Duplex",
  },
  {
    id: "3",
    numberOfSeats: 50,
    amenities: ["Ac", "chairs"],
    price: 3000,
    ifBooked: false,
    customerName: "",
    date: "",
    startTime: "",
    endTime: "",
    RoomId: 203,
    RoomName: "Classic",
  },
  {
    id: "4",
    numberOfSeats: 100,
    amenities: ["Ac", "chairs", "discolights"],
    price: 5000,
    ifBooked: true,
    customerName: "Suresh",
    date: "03-feb-2022",
    startTime: "15-feb-2022 at 12PM",
    endTime: "16-feb-2020 at 11am",
    RoomId: 204,
    RoomName: "Duplex",
  },
  {
    id: "5",
    numberOfSeats: 100,
    amenities: ["Ac", "chairs", "discolights"],
    price: 5000,
    ifBooked: true,
    customerName: "Suresh",
    date: "08-may-2022",
    startTime: "15-feb-2022 at 12PM",
    endTime: "16-feb-2020 at 11am",
    RoomId: 234,
    RoomName: "Duplex",
  },
];

// Listeneing to server
app.listen(9000, () => console.log("server on 9000"));

// 1.Creating a room

app.post("/all", async (req, res) => {
  try {
    const newRoom = {
      id: hallData.length + 1,
      numberOfSeats: req.body.numberOfSeats,
      price: req.body.price,
    };

    hallData.push(newRoom);

    res
      .status(200)
      .json({ message: "room created successfully 📝", data: newRoom });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal server Error" });
  }
});

// 2.Booking A room
app.put("/book/:id", (req, res) => {
  try {
    const { id } = req.params;
    const halls = hallData.find(hall => hall.RoomId === parseInt(id));
    // logic to prevent already booked room
    if (halls.ifBooked) {
      res.status(200).send("Sorry,this room is already booked ❌");
    }
    // Booking a room
    else halls.customerName = req.body.customerName;
    halls.date = req.body.date;
    halls.startTime = req.body.startTime;
    halls.endTime = req.body.endTime;
    res.status(200).json({ message: "room booked successfully", room: halls });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal server Error" });
  }
});

// 3. list all rooms with booked data

app.get("/all", (req, res) => {
  try {
    const { RoomName, ifBooked, startTime, endTime, date, customerName } =
      req.query;
    let filteredHall = hallData;
    if (RoomName) {
      filteredHall = filteredHall.filter(hall => hall.RoomName == RoomName);
    }
    if (ifBooked) {
      filteredHall = filteredHall.filter(hall => hall.ifBooked === ifBooked);
    }
    if (startTime) {
      filteredHall = filteredHall.filter(hall => hall.startTime === startTime);
    }
    if (endTime) {
      filteredHall = filteredHall.filter(hall => hall.endTime === endTime);
    }
    if (date) {
      filteredHall = filteredHall.filter(hall => hall.date === date);
    }
    if (customerName) {
      filteredHall = filteredHall.filter(
        hall => hall.customerName === customerName
      );
    }

    res
      .status(200)
      .json({ message: "Room details loaded successfully", filteredHall });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal server Error" });
  }
});

// 4.List All customers

app.get("/customer", (req, res) => {
  try {
    const { customerName, RoomName, date, startTime, endTime } = req.query;

    let filteredHall = hallData;

    if (customerName) {
      filteredHall = filteredHall.filter(
        hall => hall.customerName === customerName
      );
    }
    if (RoomName) {
      filteredHall = filteredHall.filter(hall => hall.RoomName == RoomName);
    }
    if (startTime) {
      filteredHall = filteredHall.filter(hall => hall.startTime === startTime);
    }
    if (endTime) {
      filteredHall = filteredHall.filter(hall => hall.endTime === endTime);
    }
    if (date) {
      filteredHall = filteredHall.filter(hall => hall.date === date);
    }

    if (filteredHall.length === 0) {
      res.status(200).json({ message: "invaild details" });
    }

    res.status(200).json({
      message: "Room Details Loaded Successfully",
      RoomDetails: filteredHall,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal server Error" });
  }
});

// 5.list how many times customer booked the room

app.get("/details", (req, res) => {
  try {
    const { customerName } = req.query;
    let bookedHall = hallData;

    if (customerName) {
      bookedHall = bookedHall.filter(
        hall => hall.customerName === customerName
      );
    }

    if (bookedHall.length === 0) {
      res.status(400).json({ message: "user not found" });
    }

    // booking details
    res.status(200).json({
      message: "Room Details Loaded Successfully",
      RoomDetails: bookedHall,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal server Error" });
  }
});
