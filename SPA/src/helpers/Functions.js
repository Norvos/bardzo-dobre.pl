
export function orderSort(orders) {

    orders = orders.sort(function(a,b){
    return new Date(b.orderedAt) - new Date(a.orderedAt)})

 return {
    ordered: orders.filter(order => order.state === "Ordered"),
    inProgress: orders.filter(
      order => order.state === "In progress"
    ),
    inDelivery: orders.filter(
      order => order.state === "In delivery"
    ),
    finalised: orders.filter(order => order.state === "Finalised")
    }
}