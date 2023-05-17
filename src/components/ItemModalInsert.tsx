import { IonButton, IonContent, IonInput, IonItem, IonTextarea } from "@ionic/react";
import { useState } from "react";
import { useAuth } from "../AuthContext";
import { useInsertItem} from '../hooks/useGetItems';


interface ContainerProps {
    dismiss: any;
    item?: any;
    listId: number;
}

const ItemModalInsert: React.FC<ContainerProps> = ({ dismiss, item, listId }) => {

    const [title, setTitle] = useState(item?.title)
    const [note, setNote] = useState(item?.note)

    const { user } = useAuth()

    const { mutate: insert } = useInsertItem({
        user_id: user?.id,
        list_id: listId,
        title: title,
        note: note,
        is_checked: false
    })

    // const handleInsertItemDirect = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     const item = {
    //         user_id: user?.id,
    //         list_id: listId,
    //         title: title,
    //         note: note,
    //         is_checked: false
    //     }
    //     insertItem(item)
    //     dismiss()
    // }

    const handleInsertItem = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        insert()
        dismiss()
    }

    return (
        <IonContent className="ion-padding background-white">
        <form
            onSubmit={handleInsertItem}
        >
            <IonItem>
                <IonInput
                    value={title}
                    name='title'
                    label='Title'
                    labelPlacement='stacked'
                    onIonChange={(e) => setTitle(e.detail.value! as string)}
                    type='text'
                >
                </IonInput>
            </IonItem>
            <IonItem>
                <IonTextarea
                    value={note}
                    name='note'
                    label='Note'
                    labelPlacement='stacked'
                    onIonChange={(e) => setNote(e.detail.value! as string)}
                    autoGrow={true}
                >
                </IonTextarea>
            </IonItem>
            <IonButton
                className='login-btn'
                type='submit'
                size='default'
                expand='block'
            >
                {item ? 'Update' : 'Create'}
            </IonButton>
        </form>
        </IonContent>
    )
}

export default ItemModalInsert