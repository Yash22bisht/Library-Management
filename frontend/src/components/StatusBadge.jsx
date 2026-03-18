// Reusable status badge used in both panels
export default function StatusBadge({ status, borrowedBy }) {
  if (status === "available") {
    return (
      <span className="bg-teal-50 text-teal-600 text-xs font-semibold px-2.5 py-1 rounded-full">
        Available
      </span>
    );
  }
  else if(status === "pending"){
    return(
      <span className="bg-yellow-100 text-yellow-600 text-xs font-semibold px-2.5 py-1 rounded-full">
        Pending
      </span>
    )
  }

  else if(status === "return_initiated"){
    return(
      <span className="bg-yellow-100 text-yellow-600 text-xs font-semibold px-2.5 py-1 rounded-full">
        Return Initiated
      </span>
    )
  }

  else if(status === "returned"){
    return(
      <span className="bg-green-100 text-green-600 text-xs font-semibold px-2.5 py-1 rounded-full">
        Returned
      </span>
    )
  }

  else if(status === "rejected"){
    return(
      <span className="bg-red-100 text-red-600 text-xs font-semibold px-2.5 py-1 rounded-full">
        Rejected
      </span>
    )
  }
  return (
    <span className="bg-orange-100 text-orange-500 text-xs font-semibold px-2.5 py-1 rounded-full">
      {borrowedBy ? `Borrowed by ${borrowedBy}` : "Borrowed"}
    </span>
  );
}