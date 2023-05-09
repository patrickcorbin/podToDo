import { IonCheckbox, IonItem } from "@ionic/react";
import { useState } from "react";
import { useGetItems, updateItem, useUpdateItem } from '../hooks/useGetItems';


interface ContainerProps {
    item: any;
    refetch: any;
}

const ListItem: React.FC<ContainerProps> = ({ item, refetch }) => {

    const handleChange = useUpdateItem(item.id, {
        ...item,
        is_checked: !item.is_checked
    })

    const handleCheck = async (itemId: number, item: any) => {
        updateItem(itemId, {
            ...item,
            is_checked: !item.is_checked
        })
        // setIsChecked((prevIsChecked: boolean) => !prevIsChecked)
        // refetch()
    }

    return (
        <IonItem className="background-white"
            lines='full'
        >
            
        <IonCheckbox 
            slot='start'
            checked={item.is_checked}
            onClick={() => handleCheck(item.id, item)}
            // onClick={() => handleChange.mutate()}
            labelPlacement='end'
        >
            {item.title}
        </IonCheckbox>
        </IonItem>
    );
};

export default ListItem;
