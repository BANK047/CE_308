import { useState, useEffect } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"; 
import { useLocalSearchParams, useRouter } from "expo-router";
import { getBookById, updateBook } from "../../services/bookService";

export default function EditBookScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>(); //pull id from URL

    const [title, setTitle] = useState(''); // stat from receive data book
    const [author, setAuthor] = useState(''); // stat from receive data author
    const [description, setDescription] = useState(''); // stat from receive data description
    const [price, setPrice] = useState(''); // stat from receive data price

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const book = await getBookById(id); //pull data for API by use { id } 
                setTitle(book.title); // set data book in stat
                setAuthor(book.author); // set data author in stat
                setDescription(book.description); // set data description in stat
                setPrice(String(book.price)); // set data price in stat (convert to string from TextInput)
            } catch {
                Alert.alert('Error', 'Failed to load book'); // Alert Error if book not loading
                router.back(); // back previous
            }
        };
        fetchBook(); // call func fetchBook when component mounted and when { id } change
    }, [id]);

    const handleUpdate = async () => {
        if (!title || !author || !price) { // checked field are required 
            Alert.alert('Validation', 'Title, Author & Price are required.');
            return;
        }

        try {
            await updateBook(id, {
                title,
                author,
                description,
                price: parseFloat(price),
            });
            Alert.alert('Success', 'Book update!');
            router.back();
        } catch {
            Alert.alert('Error', 'Failed to update book')
        }
    };

    return (
        <ScrollView className="flex-1 bg-gray-100">
            {/* Header */}
            <View className="bg-yellow-400 px-4 py-4">
                <Text className="text-white text-xl font-bold">Edit Book</Text>
            </View>
            <View className="p-4 gap-4">
                {/* Title */}
                <View>
                    <Text className="text-gray-600 mb-1 font-bold">Title *</Text>
                    <TextInput
                        className="bg-white rounded-xl px-4 py-3 border border-gray-200"
                        placeholder="Book Title"
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>
                {/* Author */}
                <View>
                    <Text className="text-gray-600 mb-1 font-bold">Author *</Text>
                    <TextInput
                        className="bg-white rounded-xl px-4 py-3 border border-gray-200"
                        placeholder="Author name"
                        value={author}
                        onChangeText={setAuthor}
                    />
                </View>
                {/* Description */}
                <View>
                    <Text className="text-gray-600 mb-1 font-bold">Description *</Text>
                    <TextInput
                        className="bg-white rounded-xl px-4 py-3 border border-gray-200"
                        placeholder="Shourt description"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        numberOfLines={3}
                        style={{ textAlignVertical: 'top' }}
                    />
                </View>
                {/* Price */}
                <View>
                    <Text className="text-gray-600 mb-1 font-bold">Price *</Text>
                    <TextInput
                        className="bg-white rounded-xl px-4 py-3 border border-gray-200"
                        placeholder="0.00"
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="decimal-pad"
                    />
                </View>
                {/* Update */}
                <TouchableOpacity
                    className="bg-yellow-400 py-4 rounded-xl items-center mt-2"
                    onPress={handleUpdate}
                >
                    <Text className="text-white font-bold">Update Book</Text>
                </TouchableOpacity>

                {/* Cancel */}
                <TouchableOpacity
                    className="bg-gray-200 py-4 rounded-xl items-center"
                    onPress={() => router.back()}
                >
                    <Text className="text-gray-600 font-semibold text-base">Cancel</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}