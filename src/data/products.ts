export interface Product {
    id: string;
    name: string;
    price: number;
    category: 'Science' | 'Technology' | 'Engineering' | 'Arts' | 'Math';
    inStock: boolean;
    image: string;
    description: string;
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Crystal Growing Kit',
        price: 24.99,
        category: 'Science',
        inStock: true,
        image: 'https://images.unsplash.com/photo-1530973428-5bf2db2e4d71?w=500&q=80',
        description: 'Grow vibrant crystals in 7 different colors.'
    },
    {
        id: '2',
        name: 'Robot Building Arm',
        price: 49.99,
        category: 'Technology',
        inStock: true,
        image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=500&q=80',
        description: 'Programmable robotic arm with 4 degrees of freedom.'
    },
    {
        id: '3',
        name: 'Wooden Bridge Builder',
        price: 34.50,
        category: 'Engineering',
        inStock: true,
        image: 'https://m.media-amazon.com/images/I/71Ugxyis8BL._AC_SX342_SY445_QL70_FMwebp_.jpg',
        description: 'Learn structural engineering by building wooden bridges.'
    },
    {
        id: '4',
        name: 'Digital Art Tablet',
        price: 59.99,
        category: 'Arts',
        inStock: true,
        image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500&q=80',
        description: 'Create digital masterpieces with this kid-friendly tablet.'
    },
    {
        id: '5',
        name: 'Math Puzzle Cube',
        price: 12.99,
        category: 'Math',
        inStock: true,
        image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&q=80',
        description: 'Challenge your mind with 3D math puzzles.'
    },
    {
        id: '6',
        name: 'Solar System Model',
        price: 29.99,
        category: 'Science',
        inStock: true,
        image: 'https://m.media-amazon.com/images/I/71EM2oXXlQL._AC_SY300_SX300_QL70_FMwebp_.jpg',
        description: 'Motorized solar system model with illuminated sun.'
    },
    {
        id: '7',
        name: 'Coding Board Game',
        price: 39.99,
        category: 'Technology',
        inStock: false,
        image: 'https://images.unsplash.com/photo-1611996908543-130c1e9c96d2?w=500&q=80',
        description: 'Learn logic and loops without screen time.'
    },
    {
        id: '8',
        name: 'Hydraulic Claw',
        price: 19.99,
        category: 'Engineering',
        inStock: true,
        image: 'https://m.media-amazon.com/images/I/71AbbuT4FXL._AC_UL320_.jpg',
        description: 'Build your own hydraulic claw from scratch.'
    },
    {
        id: '9',
        name: 'Pottery Wheel Set',
        price: 44.99,
        category: 'Arts',
        inStock: true,
        image: 'https://m.media-amazon.com/images/I/712h0UqtYCL._AC_UL320_.jpg',
        description: 'Mold and paint your own ceramic creations.'
    },
    {
        id: '10',
        name: 'Fraction Pizza Game',
        price: 15.99,
        category: 'Math',
        inStock: true,
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80',
        description: 'A delicious way to learn fractions.'
    }
];
