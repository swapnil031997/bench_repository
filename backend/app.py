from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from .models import db
from .auth import auth
from .resources import resources
from .bookings import bookings

def create_app():
        app = Flask(__name__)
            app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://admin:Swapnil031997@database-1.cfsmwq2suar8.ap-south-1.rds.amazonaws.com/bench_portal_db'
                app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
                    app.config['SECRET_KEY'] = 'your_secret_key'  # Change this in production
                        app.config['JWT_SECRET_KEY'] = 'jwt_secret_key'  # Change this in production

                            db.init_app(app)
                                with app.app_context():
                                            db.create_all()

                                                jwt = JWTManager(app)
                                                    CORS(app)

                                                        app.register_blueprint(auth)
                                                            app.register_blueprint(resources)
                                                                app.register_blueprint(bookings)

                                                                    return app

                                                                if __name__ == '__main__':
                                                                        app = create_app()
                                                                            app.run(debug=True)

