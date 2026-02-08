import "./global.css";
import { ItemCard } from "./components/ItemCard";
import { View, Text , ScrollView, Alert } from "react-native";
import { useState } from "react";
import { CustomInput } from "./components/CustomInput";
import { CustomButton } from "./components/CustomButton";
// import { CenteredView } from "./components/CenteredView";
// import { CustomButton } from "./components/CustomButton";
// import { FlatList } from "react-native";

export default function Index() {

    const Fruits: { id: string; 
                    productName: string; 
                    price: number; pcs: number; 
                    btnSize: "sm" | "md" | "lg"; 
                    btnColor: "primary" | "secondary" | "danger"; 
                }[] = [
        
        { id: "1", productName: "Banana", price: 2000, pcs: 10, btnSize: "sm", btnColor: "primary" },
        { id: "2", productName: "Mango", price: 2000, pcs: 10, btnSize: "md", btnColor: "secondary" },
        { id: "3", productName: "Apple", price: 2000, pcs: 10, btnSize: "lg", btnColor: "danger" },
    ];

    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');


    
    return (
        <View className=" bg-white">
        {/* <ScrollView className=" mb-20 pb-20"> */}
            <ItemCard items={Fruits} />
            {/* <View className="px-4 pt-4">
                <Text className="text-xl font-bold mb-4"> กรอกข้อมูลสินค้า</Text>
                    <CustomInput
                        label='ชื่อสินค้า'
                        value={productName}
                        onChangeText={setProductName}
                        placeholder="กรุณากรอกชื่อสินค้า"
                        />

                    <CustomInput
                        label='ราคา'
                        value={price}
                        onChangeText={setPrice}
                        placeholder="กรุณากรอกราคา"
                        />

                    <CustomInput
                        label='จำนวน'
                        value={quantity}
                        onChangeText={setQuantity}
                        placeholder="กรุณากรอกจำนวน"
                        />

                    <CustomButton
                        title="ยืนยัน"
                        onPress={() => alert('ยืนยัน')}
                        size="md"
                        variant="primary"
                        />
            </View> */}
        {/* </ScrollView> */}
    </View>
  );
}
