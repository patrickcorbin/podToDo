import { IonCheckbox, IonItem, useIonModal} from "@ionic/react";
import { useEffect, useState } from "react";
import { updateItem, useUpdateItem } from '../hooks/useGetItems';

import ItemModalUpdate from './ItemModalUpdate';

interface ContainerProps {
    item: any;
    refetch: any;
}

const ListItem: React.FC<ContainerProps> = ({ item, refetch }) => {

    const { mutate, status } = useUpdateItem(item.id, item.list_id, {
        ...item,
        is_checked: !item.is_checked
    })

    const [isChecked, setIsChecked] = useState<boolean>(item.is_checked)

    useEffect(() => {
        if (status === 'success') {
            setIsChecked(prevIsChecked => !prevIsChecked)
        }
    }, [status])

    const [present, dismiss] = useIonModal(ItemModalUpdate, {
        dismiss: () => dismiss(),
        item: item,
    })

    const modalOptions = {
        onDidDismiss: () => {
            // refetch()
            dismiss()
        },
        breakpoints: [0, .25, 0.5, 0.75, 1],
        initialBreakpoint: .5,
        backdropBrealpoint: .2
    }

    // const handleCheck = async (itemId: number, item: any) => {
    //     updateItem(itemId, {
    //         ...item,
    //         is_checked: !item.is_checked
    //     })
    //     setIsChecked(prevIsChecked => !prevIsChecked)
    //     console.log('check called')
    // }

    const handleCheckMutate = async (e: any) => {
        mutate()
        e.stopPropagation()
    }

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
