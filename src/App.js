import wineImg from './static/wine-svgrepo-com.svg'
import EastIcon from '@mui/icons-material/East';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Card from './components/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { useSelector } from 'react-redux'
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { increCount, decreCount, clearCart } from './store/modules/cartFoodStore';
import Button from '@mui/material/Button';
import PaymentsIcon from '@mui/icons-material/Payments';
import { useRef } from 'react';
const CartWrapper = () => {
    return (
        <>
            <div className=" bg-white p-12 rounded-xl min-w-[1400px] mx-auto justify-center my-8 flex">
                <MenuBar />
                <CartBar />
            </div>
        </>
    )
}
const MenuBar = () => {
    return (
        <>
            <div className="px-lg py-lg flex flex-col justify-between *:my-4">
                <MenuHeader />
                <MenuBanner />
                <FoodCategory />
                <FoodList />
            </div>
        </>
    )
}
const MenuHeader = () => {
    return (
        <>
            <div className="flex text-xl items-center">
                <div className='flex items-center grow-[1] font-mono text-lg font-bold'>
                    James's Restaurant
                </div>
            </div>
        </>
    )
}

const MenuBanner = () => {
    return (
        <div className="w-full h-48 bg-orange-100 rounded-2xl overflow-hidden mt-6 flex justify-between px-8 py-6">
            <img src={wineImg} className='scale-60'></img>
            <div className='flex flex-col justify-center text-lg font-bold'>
                <h1 className='text-orange-500'>$0 delivery for 30 days!  🎉</h1>
                <p>$0 delivery fee for orders over $10 for 30 days</p>
            </div>
            <span className='self-end hidden lg:flex text-sm items-center font-bold'>Learn More<EastIcon sx={{ fontSize: 16, ml: 2 }} /></span>
        </div>
    )
}
const FoodCategory = () => {
    return (
        <div>
            <div className="flex w-full justify-between items-center">
                <h1 className='font-bold text-2xl'>Food Categories 🍔</h1>
                <a className='flex justify-between p-3 bg-orange-400 *:m-1 items-center rounded-xl text-white'>
                    <AccessTimeIcon />
                    Delivery:now
                    <KeyboardArrowDownIcon />
                </a>
            </div>
        </div>
    )
}

const FoodList = () => {
    const foodList = useSelector(state => state.foods.foodsList)
    return (
        <>
            <ul className='grid grid-cols-4 grid-rows-1 gap-3'>
                {foodList.map((item, index) => { return <li className='px-1' key={index}><Card id={item.id} name={item.name} description={item.description} img={item.image} price={item.price} /></li> })}
            </ul>
        </>
    )
}
const CartBar = () => {
    const cartList = useSelector(state => state.foods.cartList)
    const dispatch = useDispatch();
    const dialogRef = useRef(null)
    return (
        <>
            <div className={classNames('py-4 bg-[#fdfdfb] px-10 font-serif grow flex flex-col justify-between', { 'hidden': cartList.length === 0 })}>
                <h1 className='text-xl font-bold mb-6'>My Order 😎</h1>
                <ul className='flex flex-col *:flex *:justify-between *:items-center *:mb-4'>
                    {cartList.map(item => <li key={item.id}>
                        <img src={item.img} className='w-24 h-24 rounded-lg'></img>
                        <p>
                            <IconButton aria-label="add" onClick={() => dispatch(increCount(item))}>
                                <AddIcon />
                            </IconButton>
                            {item.count}
                            <IconButton aria-label="remove" onClick={() => dispatch(decreCount(item))}>
                                <RemoveIcon />
                            </IconButton> * {item.name}</p>
                        <p>${(item.price * item.count).toFixed(2)}</p>
                        <IconButton aria-label="delete" onClick={() => dispatch(clearCart(item))}>
                            <DeleteIcon />
                        </IconButton>
                    </li>)}
                </ul>
                <hr />
                <div className='flex justify-between font-bold mt-4'>
                    <p>Total:</p>
                    <h1>${cartList.reduce((a, c) => a + c.count * c.price, 0).toFixed(2)}</h1>
                </div>
                <Button variant="outlined" startIcon={<PaymentsIcon />} onClick={() => dialogRef.current.showModal()}>
                    Make a Payment
                </Button>
                <dialog ref={dialogRef} className="backdrop:bg-zinc-300 backdrop:bg-opacity-50 rounded w-96">
                    <div className=' w-full h-full flex flex-col justify-between py-16 items-center'>
                        <h1 className='mb-4 text-4xl'>Receipt</h1>
                        <table class="table-auto mb-8 text-sm text-center border-separate border-spacing-3">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Unit Price</th>
                                    <th>Count</th>
                                    <th>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                            {cartList.map(item=>
                            <tr>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.count}</td>
                            <td>{(item.price * item.count).toFixed(2)}</td>
                            </tr>)}
                            </tbody>
                        </table>
                        <h1 className='text-3xl font-bold mb-8'>{cartList.reduce((a, c) => a + c.count * c.price, 0).toFixed(2)}$</h1>
                        <form method='dialog'><button className='font-bold text-lg text-green-500 hover:text-green-700'>Close</button></form>
                    </div>
                </dialog>
            </div>

        </>
    )
}


export default CartWrapper;

