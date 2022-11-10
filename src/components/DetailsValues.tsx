import { EventTypeWithResource } from "../interfaces"

export const DetailsValues = ({ item }: { item: EventTypeWithResource }) => (
  <span className='history-table__details-text-values'>
    {item.myResource?.values && item.myResource?.values.length
      ? item.myResource?.values.map((val, index) => (
          <span key={index}>
            {index < 3 &&
              (typeof val === "string" ? (
                <span className='history-table__details-text-item'>
                  {val.length < 40 ? val : `${val.slice(0, 45)}...`}
                  {val.length > 40 ? (
                    <span className='tooltiptext'>{val}</span>
                  ) : null}
                </span>
              ) : (
                <span className='history-table__details-text-item'>
                  {val.value} {val.unit}
                </span>
              ))}
          </span>
        ))
      : null}
  </span>
)
