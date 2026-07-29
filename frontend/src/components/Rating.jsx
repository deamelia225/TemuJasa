const Rating=({nilai})=>{
    return(
        <div>
            {
                [1,2,3,4,5].map(item=>(
                    <span key={item}>
{item<=nilai?"★":"☆"}
</span>
                ))
            }
        </div>
    );
};
export default Rating;