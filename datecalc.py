from datetime import datetime

def map_date_to_range():
    ranges = [
        datetime(2024, 8, 27, 11, 15),
        datetime(2024, 9, 13, 23, 59),
        datetime(2024, 9, 30, 23, 59),
        datetime(2024, 11, 4, 23, 59),
        datetime(2024, 11, 22, 23, 59)
    ]
    
    current_date = datetime.now()
    
    if current_date < ranges[0]:
        return 0.0
    
    if current_date > ranges[-1]:
        return 4.0
    
    for i in range(len(ranges) - 1):
        if ranges[i] <= current_date < ranges[i + 1]:
            total_seconds = (ranges[i + 1] - ranges[i]).total_seconds()
            elapsed_seconds = (current_date - ranges[i]).total_seconds()
            position = elapsed_seconds / total_seconds
            return i + position
    
    return 4.0

result = map_date_to_range()
print(f"Current value: {result}")