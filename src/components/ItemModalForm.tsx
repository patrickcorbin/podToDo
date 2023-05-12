import { IonButton, IonContent, IonInput, IonItem, IonTextarea } from "@ionic/react";
import { useState } from "react";
import { useAuth } from "../AuthContext";
import { useGetItems, updateItem, useUpdateItem, insertItem, deleteItem } from '../hooks/useGetItems';


interface ContainerProps {
    dismiss: any;
    item?: any;
    listId: number;
}

const ItemModalForm: React.FC<ContainerProps> = ({ dismiss, item, listId }) => {

    const [title, setTitle] = useState(item?.title)
    const [note, setNote] = useState(item?.note)

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

    const handleUpdateItem = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        updateItem(item.id, {
            ...item,
            title: title,
            note: note
        })
        dismiss()
    }

    const handleDeleteItem = async (e: any) => {
        e.preventDefault()
        deleteItem(item.id)
        dismiss()
    }

    return (
        <IonContent className="ion-padding background-white">
        <form
            onSubmit={item ? handleUpdateItem : handleInsertItem}
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
            {item && <IonButton
                className='login-btn'
                type='button'
                size='default'
                expand='block'
                onClick={handleDeleteItem}
            >
                Delete
            </IonButton> }
        </form>
        </IonContent>
    )
}

export default ItemModalForm