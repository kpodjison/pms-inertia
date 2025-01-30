
export const sidebarLinks = [
    {
        imgURL: "/storage/icons/home.svg",
        imgUrlActive: "/storage/icons/home-active.svg",
        route: "/admin/dashboard",
        label: "Dashboard",
    },

    {
        imgURL: "/storage/icons/dollar-circle.svg",
        imgUrlActive: "/storage/icons/dollar-circle-active.svg",
        route: "/admin/dashboard/properties",
        label: "Properties",
    },
    {
        imgURL: "/storage/icons/dollar-circle.svg",
        imgUrlActive: "/storage/icons/dollar-circle-active.svg",
        route: "/admin/dashboard/transactions",
        label: "Transactions",
    },
    {
        imgURL: "/storage/icons/dollar-circle.svg",
        imgUrlActive: "/storage/icons/dollar-circle-active.svg",
        route: "/admin/dashboard/notification",
        label: "Notification",
    },

    {
        imgURL: "/icons/settings.svg",
        imgUrlActive: "/icons/settings-active.svg",
        route: "/settings",
        label: "Settings",
    }
];


export const apartments = [
    {
        id: 1,
        propertyType: "Apartment",
        location: "Downtown City Center",
        name: "Luxury City Apartment",
        tag: "Sell",
        description:
            "A spacious and modern apartment located in the heart of the city, featuring stunning skyline views and high-end finishes.",
        price: 350000,
        numberOfRooms: 3,
        roomSize: {
            livingRoom: "25x20",
            bedroom1: "15x12",
            bedroom2: "14x11",
            kitchen: "10x8",
        },
        numberOfShowers: 2,
        houseSize: "1200 sqft",
        images: [
            "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1654064550549-d31d73d0dee1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
    },
    {
        id: 2,
        propertyType: "Apartment",
        location: "Downtown City Center",
        name: "Modern Urban Apartment",
        tag: "Sell",
        description:
            "A stylish apartment with contemporary design elements and an open floor plan, located in a vibrant neighborhood.",
        price: 360000,
        numberOfRooms: 3,
        roomSize: {
            livingRoom: "24x18",
            bedroom1: "14x12",
            bedroom2: "13x11",
            kitchen: "11x8",
        },
        numberOfShowers: 2,
        houseSize: "1150 sqft",
        images: [
            "https://images.unsplash.com/photo-1654064550858-c62b971a378a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://plus.unsplash.com/premium_photo-1661876449499-26de7959878f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
    },
    {
        id: 3,
        propertyType: "Apartment",
        location: "Downtown City Center",
        name: "Chic City Apartment",
        tag: "Rent",
        description:
            "An elegant apartment designed for luxury living, with modern amenities and a central location.",
        price: 370000,
        numberOfRooms: 3,
        roomSize: {
            livingRoom: "26x19",
            bedroom1: "16x13",
            bedroom2: "15x12",
            kitchen: "12x9",
        },
        numberOfShowers: 2,
        houseSize: "1250 sqft",
        images: [
            "https://images.unsplash.com/photo-1654064550549-d31d73d0dee1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
    },
    {
        id: 4,
        propertyType: "Apartment",
        location: "Downtown City Center",
        name: "Sophisticated Loft",
        tag: "Sell",
        description:
            "A beautifully designed loft apartment with high ceilings and large windows, providing ample natural light.",
        price: 380000,
        numberOfRooms: 3,
        roomSize: {
            livingRoom: "28x22",
            bedroom1: "17x13",
            bedroom2: "16x12",
            kitchen: "14x10",
        },
        numberOfShowers: 2,
        houseSize: "1400 sqft",
        images: [
            "https://plus.unsplash.com/premium_photo-1661876449499-26de7959878f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1654064550858-c62b971a378a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
    },
    {
        id: 5,
        propertyType: "Apartment",
        location: "Downtown City Center",
        name: "Elegant Penthouse",
        tag: "Sell",
        description:
            "A luxurious penthouse with expansive views of the city skyline and a private terrace for outdoor relaxation.",
        price: 450000,
        numberOfRooms: 3,
        roomSize: {
            livingRoom: "30x24",
            bedroom1: "18x14",
            bedroom2: "16x13",
            kitchen: "15x10",
        },
        numberOfShowers: 3,
        houseSize: "1600 sqft",
        images: [
            "https://images.unsplash.com/photo-1654064550549-d31d73d0dee1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
    },
    {
        id: 6,
        propertyType: "Apartment",
        location: "Downtown City Center",
        name: "Contemporary Flat",
        tag: "Rent",
        description:
            "A bright and airy flat featuring modern decor and smart home technology, perfect for urban living.",
        price: 340000,
        numberOfRooms: 3,
        roomSize: {
            livingRoom: "22x18",
            bedroom1: "15x12",
            bedroom2: "14x11",
            kitchen: "11x9",
        },
        numberOfShowers: 2,
        houseSize: "1100 sqft",
        images: [
            "https://images.unsplash.com/photo-1654064550858-c62b971a378a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
    },
];
