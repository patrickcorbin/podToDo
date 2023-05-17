import { IonCheckbox, IonItem, useIonModal} from "@ionic/react";
import { useEffect, useState } from "react";
import { updateItem, useUpdateItem, useUpdateItemMutate } from '../hooks/useGetItems';

import ItemModalForm from '../components/ItemModalForm';

interface ContainerProps {
    item: any;
    refetch: any;
}

const ListItem: React.FC<ContainerProps> = ({ item, refetch }) => {

    const { mutate, status } = useUpdateItemMutate(item.id, item.list_id, {
        ...item,
        is_checked: !item.is_checked
    })

    const [isChecked, setIsChecked] = useState<boolean>(item.is_checked)

    useEffect(() => {
        if (status === 'success') {
            setIsChecked(prevIsChecked => !prevIsChecked)
        }
    }, [status])

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
        setIsChecked(prevIsChecked => !prevIsChecked)
        console.log('check called')
    }

    const handleCheckMutate = async (e: any) => {
        mutate()
        e.stopPropagation()
    }

    // const useCheckMutate = async ( itemId: number, item: any) => {
    //     useUpdateItem(itemId, item.list_id, {
    //         ...item,
    //         is_checked: !item.is_checked
    //     })
    // }

    // const useHandleCheckMutate = async (itemId: number, item: any) => {
    //     useUpdateItemMutate(itemId, item.list_id, {
    //         ...item,
    //         is_checked: !item.is_checked
    //     }).mutate()
    // }

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
            // checked={item.is_checked}
            checked={isChecked}
            // onClick={(e: any) => {handleCheck(item.id, item); e.stopPropagation()}}
            onClick={(e: any) => handleCheckMutate(e)}
            labelPlacement='end'
        >   
            {item.title}
        </IonCheckbox>
        </IonItem>
    );
};

export default ListItem;
