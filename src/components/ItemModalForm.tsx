import { IonButton, IonContent, IonInput, IonItem, IonTextarea } from "@ionic/react";
import { useState } from "react";
import { useAuth } from "../AuthContext";
import { useGetItems, updateItem, useUpdateItem, insertItem } from '../hooks/useGetItems';


interface ContainerProps {
    dismiss: any;
    listId: number;
}

const ItemModalForm: React.FC<ContainerProps> = ({ dismiss, listId }) => {

    const [title, setTitle] = useState('')
    const [note, setNote] = useState('')

    const { user } = useAuth()

    const handleInsertItem = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const item = {
            user_id: user?.id,
            list_id: 2,
            title: title,
            note: note,
            is_checked: false
        }
        insertItem(item)
        dismiss()
    }

    return (
        <IonContent className="ion-padding background-white">
        {/* <IonSearchbar onClick={() => modal.current?.setCurrentBreakpoint(0.75)} placeholder="Search"></IonSearchbar> */}
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
                // onClick={dismiss}
            >
                Create
            </IonButton>
        </form>
        </IonContent>
    )
}

export default ItemModalForm