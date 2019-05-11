import mongoose from 'mongoose';

export default () => {
    const connect = () => {
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true);
        }

        mongoose.connect(process.env.MONGO_URL, {
            useFindAndModify: false,
            useNewUrlParser: true
        }, (error) => {
            if (error) {
                console.error('몽고디비 연결 에러', error);
            } else {
                console.log('몽고디비 연결 성공')
            }
        });
    }
    connect();

    mongoose.connection.on('error', (e) => {
        console.error('몽고디비 연결 에러', e);
    })

    mongoose.connection.on('disconnected', () => {
        console.error('몽고디비 연결 끊어짐, 재연결');
        connect();
    })

    require('./emailToken');
    require('./user');
}