import { View, Text, FlatList } from 'react-native';
import { CustomButton } from './CustomButton';

type ItemCardProps = {
   items: { id: string; productName: string; price: number; pcs: number; btnSize: 'sm' | 'md' | 'lg'; btnColor: 'primary' | 'secondary' | 'danger'; }[];
};

export const ItemCard = ({ items }: ItemCardProps) => {

    return ( 
        <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <View className='mx-2 my-4 px-2'>
                <View className=" w-[380] rounded-lg p-4 bg-gray-100" >
                        
                    <Text className='text-4xl font-bold'> { `ชื่อสินค้า: ${item.productName}` } </Text>
                    <Text className='text-base'> { `ราคา: ${item.price}`} </Text>
                    <Text className='text-base'> { `จำนวน: ${item.pcs}`} </Text>
                                            
                    <View className='flex-row'>
                        <CustomButton
                            title="สั่งซื้อ"
                            size={item.btnSize}
                            variant={item.btnColor}
                            onPress={() => alert(` สั่งซื้อ: ${item.productName}`)}
                        />
                    </View>           
                </View>
            </View>
            )}
        />
    );
};