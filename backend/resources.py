from flask import Blueprint, request, jsonify
from .models import db, BenchResource
from flask_jwt_extended import jwt_required, get_jwt_identity

resources = Blueprint('resources', __name__)

@resources.route('/api/resources', methods=['GET'])
                 def get_resources():
                         resources = BenchResource.query.all()
                             return jsonify([resource.serialize() for resource in resources]), 200

                         @resources.route('/api/resources/<int:id>', methods=['DELETE'])
                         @jwt_required()
                         def delete_resource(id):
                                 resource = BenchResource.query.get(id)
                                     if resource:
                                                 db.session.delete(resource)
                                                         db.session.commit()
                                                                 return jsonify({'message': 'Resource deleted'}), 200
                                                                 else:
                                                                             return jsonify({'message': 'Resource not found'}), 404

