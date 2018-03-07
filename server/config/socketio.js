let socketio = null;

export default function(io) {
     socketio = io;
};

export function onStudentsChange() {
    socketio.emit('studentsUpdated');
};
