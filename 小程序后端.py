# 2024-07-08,15点17d   算法最终的服务: nohup ~/miniconda3/bin/python  backend.py  &

import sqlite3
# import cv2
import os
import io
import json

from io import BytesIO  
import os
print(os.cpu_count(), 'cpushuliaing')



from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  # 解决跨域问题

basedir = os.path.abspath(os.path.dirname(__file__))  # 定义一个根目录 用于保存图片用
UPLOAD_ROOT_PATH = 'pic_data'
# http://172.27.118.204:5050


from flask import Flask, request
lastorder=None

@app.route('/food/pay', methods=['GET', 'POST'])
def editorData22221211212312222():
    return jsonify(lastorder)


@app.route('/food/order', methods=['GET', 'POST'])
def editorData2222121222():
    global lastorder
    ttttt=request.args.get('id')
    ttttt2=request.args.get('comment')
    if ttttt2:
        lastorder['comment']=ttttt2
    print('是否取数据', ttttt)
    if ttttt:
        print('343423423',ttttt)
        return jsonify(lastorder)
    print(request)
    data=(request.json)
    if 'id' in data:
        return jsonify(lastorder)
        
    print(data,99999999999999999999999)
    p=0
    print(21321312312)
    print(data,4355555555555555555555555555555)
    for i in data['order']:
        kk=data['order'][i]
        print(65436346435342534534,kk)
        p+=float(kk['price'])*float(kk['number'])
    # 食物的图片使用网络图片url和本地路径都可以.
    # data=data['order']
    data['price']=p
    data['order_id']=0

    lastorder=data
    print('sdaflkasdjflk;asdjflk',data)
    return jsonify(data)







@app.route('/food/list', methods=['GET', 'POST'])
def editorData222222():
    # 食物的图片使用网络图片url和本地路径都可以.
    return jsonify({'list':[{'name':'类别1','food':[{
        'id':0,
        'name':'食物1',
        'price':'11',
        'image_url':'/images/index/b_2.jpg',
        
        
        },{
'id':1,
        'name':'食物2',
        'price':'12',
        'image_url':'/images/index/b_2.jpg',
        
        
        },
        {'id':2,
        'name':'食物3',
        'price':'12',
        'image_url':'/images/index/b_2.jpg',
        
        
        },
        {'id':3,
        'name':'食物4',
        'price':'12',
        'image_url':'/images/index/b_2.jpg',
        
        
        },
        {'id':4,
        'name':'食物5',
        'price':'12',
        'image_url':'/images/index/b_2.jpg',
        
        
        },
        {'id':5,
        'name':'食物6',
        'price':'12',
        'image_url':'/images/index/b_2.jpg',
        
        
        },
        {'id':6,
        'name':'食物7',
        'price':'12',
        'image_url':'/images/index/b_2.jpg',
        
        
        }
        ]},{'name':'类别2','food':[{
            'id':7,
        'name':'食物21',
        'price':'11',
        'image_url':'/images/index/b_2.jpg',
        
        
        },{
            'id':8,
        'name':'食物22',
        'price':'12',
        'image_url':'/images/index/b_2.jpg',
        
        
        }
        ]},{'name':'类别3','food':[{
            'id':9,
        'name':'食物31',
        'price':'11',
        'image_url':'/images/index/b_2.jpg',
        
        
        },{'id':10,
        'name':'食物32',
        'price':'12',
        'image_url':'/images/index/b_2.jpg',
        
        
        }
        ]},{'name':'类别4','food':[{
            'id':11,
        'name':'食物41',
        'price':'11',
        'image_url':'/images/index/b_2.jpg',
        
        
        },{'id':12,
        'name':'食物42',
        'price':'12',
        'image_url':'/images/index/b_2.jpg',
        
        
        }
        ]}],
                    'promotion':['1','2','3']
                    
                    })


@app.route('/food/index', methods=['GET', 'POST'])
def editorData():
    
    return jsonify({'list':['1','2','3'],
                    'promotion':['1','2','3']
                    
                    })

@app.route('/user/setting', methods=['GET', 'POST'])
def editorData222():
    
    return jsonify({'isLogin':True})









if __name__ == '__main__':
    app.run(host="0.0.0.0", port=80,debug=True)
