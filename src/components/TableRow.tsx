import { formatDate } from "../helpers"
import { EventTypeWithResource } from "../interfaces"
import { DetailsValues } from "./DetailsValues"

export const TableRow = ({
  item,
  index,
}: {
  item: EventTypeWithResource
  index: number
}) => {
  return (
    <div
      className={`history-table__table-row ${
        !item.noFirst ? "with-separator" : ""
      }`}
      key={item.id + index.toString()}
    >
      <div className='history-table__table-cell history-table__name-col '>
        {!item.noFirst && (
          <span
            className={`history-table__first-cell history-table__cell-${item.name}`}
          >
            {item.name}
          </span>
        )}
      </div>
      <div className='history-table__details-col'>
        <span className='history-table__details-text-container'>
          <span className='history-table__details-name'>
            {item.myResource?.details}
          </span>
          {item.myResource?.values && item.myResource?.values.length ? ":" : ""}
          <DetailsValues item={item} />
        </span>
      </div>
      <div className='history-table__code-col history-table__code-col-tbody'>
        {item.myResource?.code}
      </div>
      <div
        className={`history-table__date-col ${item.noFirst ? "gray-data" : ""}`}
      >
        {formatDate(item.date)}
      </div>
    </div>
  )
}
