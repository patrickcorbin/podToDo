import { IonButton, IonContent, IonInput, IonItem, IonTextarea } from "@ionic/react";
import { useState } from "react";
import { useAuth } from "../AuthContext";
import { useGetItems, updateItem, useUpdateItem, insertItem } from '../hooks/useGetItems';


interface ContainerProps {
    dismiss: any;
    itemId?: number;
    listId: number;
}

const ItemModalForm: React.FC<ContainerProps> = ({ dismiss, itemId, listId }) => {

    const [title, setTitle] = useState('')
    const [note, setNote] = useState('')

    const { user } = useAuth()

    const handleInsertItem = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const item = {
            user_id: user?.id,
            list_id: listId,
            title: title,
            note: note,
            is_checked: false
        }
        insertItem(item)
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
                Create
            </IonButton>
        </form>
        </IonContent>
    )
}

export default ItemModalForm