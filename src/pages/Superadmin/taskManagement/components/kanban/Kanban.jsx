import "../../components/../../../../styling/kanban.css"
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import mockData from '../mockData'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ClearIcon from '@material-ui/icons/Clear';
import CachedIcon from '@material-ui/icons/Cached';
import Card from '../TaskManenagemnet/Card'
import Editable from '../Editabled/Editable'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { useEffect } from "react"
import DescriptionIcon from '@material-ui/icons/Description';
import axios from "axios"
import common from "../../../../../baseUrl"
import moment from "moment"
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import CheckIcon from '@material-ui/icons/Check';
import HelpIcon from '@material-ui/icons/Help';
import $ from 'jquery';
import { DropDownList } from "@progress/kendo-react-dropdowns"
import { toast } from "react-toastify"

const Kanban = () => {

    const [data, setData] = useState(mockData)
    const [currentstatus, setStatus] = useState()
    const [allAdmins, setAllAdmins] = useState()
    const [Admin, setAdmin] = useState("")
    const [allCards, setAllcards] = useState([])
    const [todo, setTodo] = useState([])
    const [Inprogress, setInprogress] = useState([])
    const [Awaiting, setAwaiting] = useState([])
    const [Completed, setCompleted] = useState([])
    const [notStarted, setNotstarted] = useState([])
    // const [card, setCard] = useState({
    //     id: "",
    //     title: "",
    //     status: "",
    //     created_on: "",
    //     updated_on: "",
    //     assigned_to: "",
    //     assigned_by: "",
    //     deadline: "",

    // })
    // const { id, title, status, created_on, updated_on, assigned_to, assigned_by, deadline } = card;

    // const [isDraging, setIsDragging] = useState()
    useEffect(() => {
        getTasks()
    }, [Admin])
    const getTasks = async (id) => {
        const url = `TaskManager/ListTask`
        const allTasks = await axios({
            method: "get",
            url: `${common.baseUrl}${url}`

        })

        setAllcards(allTasks?.data)


        // let tempcardCopy = [...allCards]
        const toCard = allTasks?.data?.filter(item => item.status === "todo")
        setTodo(toCard)
        // let tempcardCopy1 = [...allCards]
        const toCard1 = allTasks?.data?.filter(item => item.status === "not_started")
        setNotstarted(toCard1)
        const toCard2 = allTasks?.data?.filter(item => item.status === "in_progress")
        setInprogress(toCard2)
        const toCard3 = allTasks?.data?.filter(item => item.status === "dependencies")
        setAwaiting(toCard3)
        const toCard4 = allTasks?.data?.filter(item => item.status === "completed")
        setCompleted(toCard4)


    }

    const sortByAdmin = async (id) => {
        const url = `TaskManager/ListTask?assignee__head_admin_id=${Admin === "null" ? "" : id}`
        const allTasks = await axios({
            method: "get",
            url: `${common.baseUrl}${url}`
        })
        setAllcards(allTasks?.data)


    
        const toCard = allTasks?.data?.filter(item => item.status === "todo")
        setTodo(toCard)

        const toCard1 = allTasks?.data?.filter(item => item.status === "not_started")
        setNotstarted(toCard1)
        const toCard2 = allTasks?.data?.filter(item => item.status === "in_progress")
        setInprogress(toCard2)
        const toCard3 = allTasks?.data?.filter(item => item.status === "dependencies")
        setAwaiting(toCard3)
        const toCard4 = allTasks?.data?.filter(item => item.status === "completed")
        setCompleted(toCard4)

    }
    const onDragEnd = result => {
        if (!result.destination) return

        const { source, destination, draggableId } = result
        if (source.droppableId !== destination.droppableId) {
            const sourceColIndex = data?.findIndex(e => e.id == source.droppableId)
            const destinationColIndex = data?.findIndex(e => e.id == destination.droppableId)
            const dragedCarIndex = allCards?.findIndex(e => e.id == draggableId)

            const sourceCol = data[sourceColIndex]
            const destinationCol = data[destinationColIndex]

            const sourceTask = sourceCol?.cards

          
            allCards[dragedCarIndex].status = destinationCol?.status
            const cardStatus = allCards[dragedCarIndex].status

            


            setStatus(cardStatus)
            updatedStatus(allCards[dragedCarIndex].id, allCards[dragedCarIndex].status);


        }


    }

    const updatedStatus = async (id, status) => {
        
        const url = `TaskManager/UpdateTask/${id}`
        const updatedTask = await axios({
            method: "patch",
            url: `${common.baseUrl}${url}`,
            data: {
                status: status
            }
        })

        if (updatedTask.status == 200) {
            getTasks()
        }
        
    }
    const addCard = (status, bId, value, asignedTo, date) => {
        let userData = JSON.parse(localStorage.getItem("data"));
        const userID = userData?.super_model_id
        let bIndex = data.findIndex(item => item.id == bId)
        let tempBoard = [...data]
        tempBoard[bIndex].cards.push({
            id: uuidv4(),
            title: value,
            labels: [],
            cards: [],
            description: "",
            status: status,
            created_on: moment(Date.now()).format('YYYY-MM-DD HH:mm'),
            updated_on: moment(Date.now()).format('YYYY-MM-DD HH:mm'),
            assignee: asignedTo,
            created_by: userID,
            deadline: moment(date).format('YYYY-MM-DD HH:mm')

        })

        setData(tempBoard)

        sendBoardData(bId, asignedTo, bIndex)


    }


    const sendBoardData = async (bId, asignedTo) => {
        let bIndex = data.findIndex(item => item.id === bId)
        const cards = data[bIndex]?.cards[data[bIndex]?.cards.length - 1]
        const url = "TaskManager/CreateTask";
       if(asignedTo)
       {
        const BoardDatares = await axios({
            method: "post",
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            },
            url: `${common.baseUrl}${url}`,
            data: cards,


        })
        if (BoardDatares.status == 201) {
            getTasks()
            setTimeout(()=>{
                    window.location.reload()
            },2000)
        }
       }
       else
       {
        toast.error("Plaese select Assigned to")
       }

    }
    const DeleteCard = async(CId) => {
        console.log(CId);
        const url = `TaskManager/delete-task/${CId}`;
        const BoardDatares = await axios({
            method: "delete",
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            },
            url: `${common.baseUrl}${url}`,
        })
        if (BoardDatares.status == 204) {
            toast.success("Card deleted successfully")
            getTasks()
        }
    }



    const updateCard = (bid, cid, card) => {
        const index = allCards.findIndex((item) => item.id === cid);
        if (index < 0) return;

        const tempBoards = allCards;

        tempBoards[index] = card;

        setData(tempBoards);
        UpdateCardData(tempBoards)
    };
    const UpdateCardData = async (updatedCard) => {

        const url = "TaskManager/UpdateTask";
        const BoardDatares = await axios({
            method: "post",
            url: `${common.baseUrl}${url}`,
            data: updatedCard,


        })
        if (BoardDatares.status == 200) {
            getTasks()
            window.location.reload()
        }

    };

    const handleShort = (e) => {
        sortByAdmin(e.target.value)
    }
    
    useEffect(async () => {

        const url2 = 'Login/AllHeadAdmin/'
        const allAdminsList = await axios({
            method: "get",
            url: `${common.baseUrl}${url2}`
        })
        setAllAdmins(allAdminsList.data);


    }, [])
    const HandleSearch = () => {

    }
    return (
        <div className="Taskmanagement__Main_body" >
            <div className="taskmangement_body__head "><h3>Task Management</h3></div>
            <div className="Taskmanagement__Main" >

                <div className="DropDown">
                    <select name="" id="" className="DropDownSelect"
                        onChange={handleShort}
                    >
                        <option value="">Sort by admin...</option>
                        {
                            allAdmins?.map(item => {
                                return (
                                    <option key={item.head_admin_id} value={item.head_admin_id}>{item?.name}</option>
                                )
                            })
                        }

                    </select>
                    <KeyboardArrowDownIcon style={{ color: "#8a28d9" }} />
                </div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className=" taskmangement_body " >
                        <div className="kanban">
                            <Droppable

                                key={"1"}
                                droppableId={"1"}
                            >
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        className='kanban__section'
                                        ref={provided.innerRef}
                                    >

                                        <div className="kanban__section__title">
                                            {
                                                data[0].title
                                            }
                                            < ClearIcon />

                                        </div>
                                        <Editable
                                            text="Add Task"
                                            placeholder="Enter Card Title"
                                            displayClass="board_add-card"
                                            editClass="board_add-card_edit"
                                            bId={"1"}
                                            dropdown

                                            onSubmit={(value, asignedTo, date) => addCard(data[0].status, "1", value, asignedTo, date)}
                                        />
                                        <div className="kanban__section__content" id="kanban__section__content">
                                            {
                                                notStarted?.map((task, index) => (
                                                    <Draggable

                                                        key={task.id.toString()}
                                                        draggableId={task?.id.toString()}
                                                        index={index}

                                                    >
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}


                                                            >
                                                                <Card
                                                                    card={task}
                                                                    Bid={"1"}
                                                                    getTasks={getTasks}
                                                                    DeleteCard={DeleteCard}
                                                                    updateCard={updateCard}
                                                                    isDraging={snapshot.isDragging}
                                                                // UpdateCardData = {UpdateCardData}
                                                                >

                                                                </Card>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))
                                            }
                                            {provided.placeholder}

                                        </div>

                                    </div>
                                )}
                            </Droppable>
                            <Droppable

                                key={"2"}
                                droppableId={"2"}
                            >
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        className='kanban__section'
                                        ref={provided.innerRef}
                                    >
                                        <div className="kanban__section__title">
                                            {
                                                data[1].title
                                            }
                                            < DescriptionIcon />

                                        </div>
                                        <div className="kanban__section__content" id="kanban__section__content">
                                            {
                                                todo?.map((task, index) => (
                                                    <Draggable

                                                        key={task?.id.toString()}
                                                        draggableId={task?.id.toString()}
                                                        index={index}

                                                    >
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}


                                                            >
                                                                <Card
                                                                    card={task}
                                                                    Bid={"2"}
                                                                    DeleteCard={DeleteCard}
                                                                    updateCard={updateCard}
                                                                    isDraging={snapshot.isDragging}
                                                                // UpdateCardData = {UpdateCardData}
                                                                >

                                                                </Card>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))
                                            }
                                            {provided.placeholder}

                                        </div>

                                    </div>
                                )}
                            </Droppable>
                            <Droppable

                                key={"3"}
                                droppableId={"3"}
                            >
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        className='kanban__section'
                                        ref={provided.innerRef}
                                    >
                                        <div className="kanban__section__title">
                                            {
                                                data[2].title
                                            }
                                            < DonutLargeIcon />

                                        </div>
                                        <div className="kanban__section__content" id="kanban__section__content">
                                            {
                                                Inprogress?.map((task, index) => (
                                                    <Draggable

                                                        key={task?.id.toString()}
                                                        draggableId={task?.id.toString()}
                                                        index={index}

                                                    >
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}


                                                            >
                                                                <Card
                                                                    card={task}
                                                                    Bid={"3"}
                                                                    DeleteCard={DeleteCard}
                                                                    updateCard={updateCard}
                                                                    isDraging={snapshot.isDragging}
                                                                // UpdateCardData = {UpdateCardData}
                                                                >

                                                                </Card>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))
                                            }
                                            {provided.placeholder}

                                        </div>

                                    </div>
                                )}
                            </Droppable>
                            {/* <Droppable

                                key={"4"}
                                droppableId={"4"}
                            >
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        className='kanban__section'
                                        ref={provided.innerRef}
                                    >
                                        <div className="kanban__section__title">
                                            {
                                                data[3].title
                                            }
                                            < ClearIcon />

                                        </div>
                                        <div className="kanban__section__content" id="kanban__section__content">
                                            {
                                                Awaiting?.map((task, index) => (
                                                    <Draggable

                                                        key={task.id.toString()}
                                                        draggableId={task.id.toString()}
                                                        index={index}

                                                    >
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}


                                                            >
                                                                <Card
                                                                    card={task}
                                                                    Bid={"4"}
                                                                    DeleteCard={DeleteCard}
                                                                    updateCard={updateCard}
                                                                    isDraging={snapshot.isDragging}
                                                                // UpdateCardData = {UpdateCardData}
                                                                >

                                                                </Card>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))
                                            }
                                            {provided.placeholder}

                                        </div>
                                    </div>
                                )}
                            </Droppable> */}
                            <Droppable

                                key={"5"}
                                droppableId={"5"}
                            >
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        className='kanban__section'
                                        ref={provided.innerRef}
                                    >
                                        <div className="kanban__section__title">
                                            {
                                                data[4].title
                                            }
                                            < CheckIcon />

                                        </div>
                                        <div className="kanban__section__content" id="kanban__section__content">
                                            {
                                                Completed?.map((task, index) => (
                                                    <Draggable

                                                        key={task.id.toString()}
                                                        draggableId={task.id.toString()}
                                                        index={index}

                                                    >
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}


                                                            >
                                                                <Card
                                                                    card={task}
                                                                    Bid={"5"}
                                                                    DeleteCard={DeleteCard}
                                                                    updateCard={updateCard}
                                                                    isDraging={snapshot.isDragging}
                                                                // UpdateCardData = {UpdateCardData}
                                                                >

                                                                </Card>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))
                                            }
                                            {provided.placeholder}

                                        </div>

                                    </div>
                                )}
                            </Droppable>
                        </div>
                    </div>
                </DragDropContext>
            </div>


        </div>
    )
}

export default Kanban