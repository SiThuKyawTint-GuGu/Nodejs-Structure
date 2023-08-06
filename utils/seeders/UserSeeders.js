
const User = require('../../models/User');
const Token = require('../../models/Token');
const generateToken = require('../../services/GenerateToken');

const seedUsers = async () => {
    try {
        const usersData = [
            {
                username: 'user1',
                email: 'user1@example.com',
                password: 'password1',
            },
            {
                username: 'user2',
                email: 'user2@example.com',
                password: 'password2',
            },
        ];

        for (const userData of usersData) {
            const user = await User.create(userData);
            const tokenValue = generateToken({ userId: user.id, email: user.email });

            const token = await Token.create({
                token: tokenValue,
                expires_at: new Date(Date.now() + 3600000),
                user_id: user.id,
            });

            console.log(`User created: ${user.username}`);
        }
    } catch (error) {
        console.error('Failed to seed users:', error);
    }
};

module.exports = seedUsers;
