// // Route for creating a user (if needed)
// router.post('/createuser', [
//     body('email').isEmail().withMessage('Invalid email address'),
//     body('name').isLength({ min: 5 }).withMessage('Name must be at least 5 characters long'),
//     body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
//     // Custom location validation example (implement according to your needs)
//     // body('location').custom(value => {
//     //     if (!isValidLocation(value)) {
//     //         throw new Error('Invalid location');
//     //     }
//     //     return true;
//     // }),
// ], async (req, res) => {
//     // Handle validation errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//         // Destructure properties from request body
//         const { name, password, email, location } = req.body;

//         // Create a new user
//         await User.create({
//             name,
//             password,
//             email,
//             location
//         });

//         // Send success response
//         res.json({ status: true });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ status: false, message: 'Internal Server Error' });
//     }
// });

// Signup route
router.post('/signup', [
    body('name').notEmpty().withMessage('name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    // Custom location validation example (implement according to your needs)
    // body('location').custom(value => {
    //     if (!isValidLocation(value)) {
    //         throw new Error('Invalid location');
    //     }
    //     return true;
    // }),
], async (req, res) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        return res.status(201).json({ status: true, message: 'Record registered' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});
