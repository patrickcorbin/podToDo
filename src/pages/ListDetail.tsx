import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonList, IonPage, IonSkeletonText, IonToolbar, IonModal, useIonViewDidLeave, useIonModal, IonInput, IonTextarea } from '@ionic/react';
import { useParams } from 'react-router';
import { addCircleOutline, cart, checkmarkCircle } from 'ionicons/icons';
import './ListDetail.css';

import { useGetItems, updateItem, useUpdateItem, insertItem } from '../hooks/useGetItems';
import { useEffect, useRef, useState } from 'react';
import ListItem from '../components/ListItem';
import { useGetList } from '../hooks/useGetLists';

import ItemModalForm from '../components/ItemModalForm';

const Tab3: React.FC = () => {

    const { id } = useParams<{ id: any }>()

    const { data: list } = useGetList(id)

    const { data: items, refetch } = useGetItems(id)

    // const modal = useRef<HTMLIonModalElement>(null);

    const [title, setTitle] = useState('')
    const [note, setNote] = useState('')
    const [currentItem, setCurrentItem] = useState()

    const [present, dismiss] = useIonModal(ItemModalForm, {
        dismiss: () => dismiss(),
        listId: parseInt(id)
    })

    const[presentUpdate, dismissUpdate] = useIonModal(ItemModalForm, {
        dismiss: () => dismiss(),
        item: currentItem,
        listId: parseInt(id)
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

    useIonViewDidLeave(() => refetch())

    const handleInsertItem = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const item = {
            list_id: {id},
            title: {title},
            note: {note},
            is_checked: false
        }
        insertItem(item)
    }

    const openModal = (item: any) => {
        presentUpdate(modalOptions)
    }

    const itemDisplay = items?.map(item => (
        <ListItem 
            key={item.id}
            item={item}
        />
    ))

    return (
    <IonPage>
        <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
                <IonBackButton text="Back" defaultHref='/app/lists' />
            </IonButtons>
        </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
        <IonItem 
            className="background-white list__name"
            lines='none'
        >
            <IonIcon icon={list?.list_type === 'grocery' ? cart : checkmarkCircle} slot='start' /> 
            {list?.name}
        </IonItem>
        <IonList>
            {
                items ? 
                itemDisplay :
                <>
                    <IonItem>
                        <IonSkeletonText animated={true} style={{ 'width': '40%' }}></IonSkeletonText>
                    </IonItem>
                    <IonItem>
                        <IonSkeletonText animated={true} style={{ 'width': '40%' }}></IonSkeletonText>
                    </IonItem>
                </>
            }
        </IonList>
        <IonButton
            id="open-modal"
            expand='block'
            onClick={() => {
                refetch()
                present(modalOptions)
            }}
        >
            <IonIcon icon={addCircleOutline} /> 
        </IonButton>
        {/* <IonModal
            className='background-white' 
            ref={modal} 
            trigger="open-modal" 
            initialBreakpoint={0.5} 
            breakpoints={[0, .25, 0.5, 0.75, 1]}
        >
          <IonContent className="ion-padding background-white">
            <form
                onSubmit={(e) => handleInsertItem(e)}
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
        </IonModal> */}
        </IonContent>
    </IonPage>
    );
};

export default Tab3;