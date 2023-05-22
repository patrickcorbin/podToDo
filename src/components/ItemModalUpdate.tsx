import { IonButton, IonContent, IonDatetime, IonInput, IonItem, IonTextarea, IonToggle } from "@ionic/react";
import { useState } from "react";
import { useDeleteItem, useUpdateItem } from '../hooks/useGetItems';


interface ContainerProps {
    dismiss: any;
    item?: any;
}

const ItemModalUpdate: React.FC<ContainerProps> = ({ dismiss, item }) => {

    const [title, setTitle] = useState(item?.title)
    const [note, setNote] = useState(item?.note)
    const [dueDate, setDueDate] = useState(item?.due_date)
    const [hasDueDate, setHasDueDate] = useState<boolean>(item?.due_date ? true : false)

    const { mutate: mutateUpdate } = useUpdateItem(item.id, item.list_id, {
        ...item,
        title: title,
        note: note,
        due_date: hasDueDate ? dueDate : null 
    })

    const { mutate: mutateDelete } = useDeleteItem(item.id)

    // const handleUpdateItemDirect = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     updateItem(item.id, {
    //         ...item,
    //         title: title,
    //         note: note
    //     })
    //     dismiss()
    // }

    // const handleDeleteItemDirect = async (e: any) => {
    //     e.preventDefault()
    //     deleteItem(item.id)
    //     dismiss()
    // }

    const handleUpdateItem = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutateUpdate()
        dismiss()
    }

    const handleDeleteItem = async (e: any) => {
        e.preventDefault()
        mutateDelete()
        dismiss()
    }

    const handleDateToggle = async () => {
        setHasDueDate(prevHasDueDate => !prevHasDueDate)
    }

    return (
        <IonContent className="ion-padding background-white">
        <form
            onSubmit={handleUpdateItem}
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
            <IonToggle
                className="date_toggle"
                labelPlacement="end"
                checked={hasDueDate}
                onIonChange={handleDateToggle}
            >
                Due Date
            </IonToggle>
            {
                hasDueDate &&
                <>
                <div className="date_picker_container">
                    <IonDatetime
                        value={dueDate}
                        name='dueDate'
                        preferWheel={true}
                        onIonChange={(e) => setDueDate(e.detail.value!)}
                    >
                    </IonDatetime>
                </div>
                </>
            }
            <IonButton
                className='login-btn'
                type='submit'
                size='default'
                expand='block'
            >
                {item ? 'Update' : 'Create'}
            </IonButton>
            <IonButton
                className='login-btn delete-btn'
                type='button'
                size='default'
                expand='block'
                color='danger'
                onClick={handleDeleteItem}
            >
                Delete
            </IonButton>
        </form>
        </IonContent>
    )
}

export default ItemModalUpdate