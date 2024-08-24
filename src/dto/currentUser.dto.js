export const currentUserDto = (user) => {
    return {
        email: user.email,
        role: user.role
    }
}