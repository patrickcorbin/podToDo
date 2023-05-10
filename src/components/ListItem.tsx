import { IonCheckbox, IonItem } from "@ionic/react";
import { useState } from "react";
import { useGetItems, updateItem, useUpdateItem } from '../hooks/useGetItems';


interface ContainerProps {
    item: any;
}

const ListItem: React.FC<ContainerProps> = ({ item }) => {

    // const handleChange = useUpdateItem(item.id, {
    //     ...item,
    //     is_checked: !item.is_checked
    // })

    const handleCheck = async (itemId: number, item: any) => {
        updateItem(itemId, {
            ...item,
            is_checked: !item.is_checked
        })
    }

    return (
        <IonItem className="background-white"
            lines='full'
        >
            
        <IonCheckbox 
            slot='start'
            checked={item.is_checked}
            onClick={() => handleCheck(item.id, item)}
            labelPlacement='end'
        >
            {item.title}
        </IonCheckbox>
        </IonItem>
    );
};

export default ListItem;
