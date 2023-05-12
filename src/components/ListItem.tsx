import { IonButton, IonCheckbox, IonItem, IonLabel, useIonModal } from "@ionic/react";
import { useState } from "react";
import { useGetItems, updateItem, useUpdateItem } from '../hooks/useGetItems';

import ItemModalForm from '../components/ItemModalForm';

interface ContainerProps {
    item: any;
}

const ListItem: React.FC<ContainerProps> = ({ item }) => {

    const { refetch } = useGetItems(item.id)

    const [present, dismiss] = useIonModal(ItemModalForm, {
        dismiss: () => dismiss(),
        item: item,
        listId: item.id
    })

    const modalOptions = {
        onDidDismiss: () => {
            refetch()
            dismiss()
        },
        breakpoints: [0, .25, 0.5, 0.75, 1],
        initialBreakpoint: .5,
        backdropBrealpoint: .2
    }

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

    // const handleUpdateItem = async (e: React.FormEvent<HTMLFormElement>, itemId: number, item: any) => {
    //     e.preventDefault()
    //     updateItem(itemId, {
    //         ...item,
    //         title: title,
    //         note: note
    //     })
    //     dismiss()
    // }

    return (
        <IonItem className="background-white"
            lines='full'
            onClick={() => {
                refetch()
                present(modalOptions)
            }}
        >
            
        <IonCheckbox 
            slot='start'
            checked={item.is_checked}
            onClick={(e: any) => {handleCheck(item.id, item); e.stopPropagation()}}
            labelPlacement='end'
        >   
            {item.title}
        </IonCheckbox>
        </IonItem>
    );
};

export default ListItem;
