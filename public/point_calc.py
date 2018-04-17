import csv
import os
import sys

def calc_points():
    download_path = get_download_path()
    file_path_anno = find('annotations_ipcrowd.csv', download_path)
    num_annotations = 0
    with open(file_path_anno, 'rb') as csv_annos:
        reader = csv.DictReader(csv_annos)
        for row in reader:
            num_annotations += 1
    file_path_ans = find('answers_ipcrowd.csv', download_path)
    ans_len = 0
    with open(file_path_ans, 'rb') as csv_answers:
        reader = csv.reader(csv_answers)
        for row in reader:
            ans_len = len(row[0])
    pts = num_annotations + ans_len
    with open("points.txt", "r") as open_file:
        curr_pts = open_file.read()
    pts += float(curr_pts.strip())
    with open("points.txt", "w") as close_file:
        close_file.write(str(int(pts)))
        close_file.close()

def find(name, path):
    for root, dirs, files in os.walk(path):
        if name in files:
            return os.path.join(root, name)

def get_download_path():
    if os.name == 'nt':
        import winreg
        sub_key = r'SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Shell Folders'
        downloads_guid = '{374DE290-123F-4565-9164-39C4925E467B}'
        with winreg.OpenKey(winreg.HKEY_CURRENT_USER, sub_key) as key:
            location = winreg.QueryValueEx(key, downloads_guid)[0]
        return location
    else:
        return os.path.join(os.path.expanduser('~'), 'downloads')

if __name__ == "__main__":
    calc_points()
