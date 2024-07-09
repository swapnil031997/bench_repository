from flask import Blueprint, jsonify
from .models import db, BenchResource
from flask_jwt_extended import jwt_required, get_jwt_identity

bookings = Blueprint('bookings', __name__)

@bookings.route('/api/book_resource/<int:resource_id>', methods=['POST'])
@jwt_required()
def book_resource(resource_id):
        current_user_id = get_jwt_identity()

            resource = BenchResource.query.get(resource_id)
                if resource and not resource.booked_by:
                            resource.booked_by = current_user_id
                                    resource.booked_company = User.query.get(current_user_id).username
                                            db.session.commit()
                                                    return jsonify({'message': 'Resource booked successfully'}), 200
                                                    else:
                                                                return jsonify({'message': 'Resource not available or already booked'}), 400

