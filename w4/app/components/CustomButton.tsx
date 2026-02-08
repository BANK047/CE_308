import { Text, TouchableOpacity } from 'react-native';

type CustomButtonProps = {
    title: string;
    onPress: () => void;
    variant?: "primary" | "secondary" | "danger";
    size?: "sm" | "md" | "lg";
};

export const CustomButton = ({
    title,
    onPress,
    variant = "primary",
    size = "md",
}: CustomButtonProps) => {

    const variantClasses = {
        primary: "bg-blue-500 ",
        secondary: "bg-gray-500 ",
        danger: "bg-red-500 ",
    };

    const sizeClasses = {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    }; 

    return (
        <TouchableOpacity
            className={[
                variantClasses[variant],
                sizeClasses[size],
                "rounded-lg active:bg-opacity-70 w-24" 
            ].join(' ')}
            onPress={onPress}
        >
            <Text className="text-white text-center font-semibold">{title}</Text>
        </TouchableOpacity>
    );
};