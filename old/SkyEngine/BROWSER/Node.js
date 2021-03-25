
		// before properties
		let beforeX, beforeY;
		
		let moveEndHandler;
		let moveXEndHandler;
		let moveYEndHandler;
		let scaleEndHandler;
		let scaleXEndHandler;
		let scaleYEndHandler;
		let rotateEndHandler;
		let fadeEndHandler;

		let parentNode, targetNode;
		let childNodes = [];

		let isHiding = false;
		let isRemoved = false;

		let eventMap = {};

		let filter;
		let blendMode;
		let isToCheckCollision;
		let isY2ZIndex;

		let isStuckLeft;
		let isStuckRight;
		let isStuckUp;
		let isStuckDown;
		
		let pauseCount = 0;
		
		let domWrapper;
		let isFirstFixDomStyle = true;
		
		let onDisplayResize;
		let displayResizeEvent;
		
		let maxCollisionWidth = BROWSER_CONFIG.SkyEngine.maxCollisionWidth;
		let maxCollisionHeight = BROWSER_CONFIG.SkyEngine.maxCollisionHeight;
		

		

		if (onDisplayResize !== undefined) {
			displayResizeEvent = EVENT('resize', RAR(() => {
				let result = onDisplayResize(WIN_WIDTH(), WIN_HEIGHT());
				
				if (result.x !== undefined) {
					setX(result.x);
				}
				if (result.y !== undefined) {
					setY(result.y);
				}
				
				if (result.scaleX !== undefined) {
					setScaleX(result.scaleX);
				}
				if (result.scaleY !== undefined) {
					setScaleY(result.scaleY);
				}
				
				if (result.width !== undefined && self.setWidth !== undefined) {
					self.setWidth(result.width);
				}
				if (result.height !== undefined && self.setHeight !== undefined) {
					self.setHeight(result.height);
				}
			}));
		}
		
		if (isY2ZIndex === true) {
			setZIndex(y);
		}

		// 노드 등록
		if (SkyEngine.Screen !== self) {
			SkyEngine.Screen.registerNode(self);
		}

		let moveTo = self.moveTo = (params, _moveEndHandler) => {
			//REQUIRED: params
			//OPTIONAL: params.x
			//OPTIONAL: params.y
			//OPTIONAL: params.speed
			//OPTIONAL: params.accel
			//OPTIONAL: params.maxSpeed
			//OPTIONAL: moveEndHandler

			if (params.y === undefined) {
				
				params.toX = params.x;
				delete params.x;
				
				params.toX < x ? moveLeft(params, _moveEndHandler) : moveRight(params, _moveEndHandler);
			}
			
			else if (params.x === undefined) {
				
				params.toY = params.y;
				delete params.y;
				
				params.toY < y ? moveUp(params, _moveEndHandler) : moveDown(params, _moveEndHandler);
			}
			
			else {
				toX = params.x;
				toY = params.y;
				
				let dx = toX - x;
				let dy = toY - y;

				let length = Math.sqrt(dx * dx + dy * dy);

				if (params.speed !== undefined) {
					speedX = params.speed * dx / length;
					speedY = params.speed * dy / length;
				}

				if (params.accel !== undefined) {
					accelX = params.accel * dx / length;
					accelY = params.accel * dy / length;
				}

				if (params.maxSpeed !== undefined) {
					
					if (toX < x) {
						minSpeedX = -params.maxSpeed * dx / length;
					} else {
						maxSpeedX = params.maxSpeed * dx / length;
					}
					
					if (toY < y) {
						minSpeedY = -params.maxSpeed * dy / length;
					} else {
						maxSpeedY = params.maxSpeed * dy / length;
					}
				}
				
				moveEndHandler = _moveEndHandler;
			}
		};

		let scaleTo = self.scaleTo = (params, _scaleEndHandler) => {
			//REQUIRED: params
			//OPTIONAL: params.x
			//OPTIONAL: params.y
			//OPTIONAL: params.speed
			//OPTIONAL: params.accel
			//OPTIONAL: params.maxSpeed
			//OPTIONAL: scaleEndHandler
			
			let speed = params.speed;
			let accel = params.accel;
			let minSpeed = params.minSpeed;
			let maxSpeed = params.maxSpeed;

			if (params.y === undefined) {
				
				toScaleX = params.x;
				
				if (toScaleX < scaleX) {
					if (speed !== undefined) {
						scalingSpeedX = -speed;
					}
					if (accel !== undefined) {
						scalingAccelX = -accel;
					}
					if (maxSpeed !== undefined) {
						minScalingSpeedX = -maxSpeed;
					}
				}
				
				else {
					if (speed !== undefined) {
						scalingSpeedX = speed;
					}
					if (accel !== undefined) {
						scalingAccelX = accel;
					}
					if (maxSpeed !== undefined) {
						maxScalingSpeedX = maxSpeed;
					}
				}
				
				scaleXEndHandler = _scaleEndHandler;
			}
			
			else if (params.x === undefined) {
				
				toScaleY = params.y;
				
				if (toScaleY < scaleY) {
					if (speed !== undefined) {
						scalingSpeedY = -speed;
					}
					if (accel !== undefined) {
						scalingAccelY = -accel;
					}
					if (maxSpeed !== undefined) {
						minScalingSpeedY = -maxSpeed;
					}
				}
				
				else {
					if (speed !== undefined) {
						scalingSpeedY = speed;
					}
					if (accel !== undefined) {
						scalingAccelY = accel;
					}
					if (maxSpeed !== undefined) {
						maxScalingSpeedY = maxSpeed;
					}
				}
				
				scaleYEndHandler = _scaleEndHandler;
			}
			
			else {
				
				toScaleX = params.x;
				
				if (toScaleX < scaleX) {
					if (speed !== undefined) {
						scalingSpeedX = -speed;
					}
					if (accel !== undefined) {
						scalingAccelX = -accel;
					}
					if (maxSpeed !== undefined) {
						minScalingSpeedX = -maxSpeed;
					}
				}
				
				else {
					if (speed !== undefined) {
						scalingSpeedX = speed;
					}
					if (accel !== undefined) {
						scalingAccelX = accel;
					}
					if (maxSpeed !== undefined) {
						maxScalingSpeedX = maxSpeed;
					}
				}
				
				toScaleY = params.y;
				
				if (toScaleY < scaleY) {
					if (speed !== undefined) {
						scalingSpeedY = -speed;
					}
					if (accel !== undefined) {
						scalingAccelY = -accel;
					}
					if (maxSpeed !== undefined) {
						minScalingSpeedY = -maxSpeed;
					}
				}
				
				else {
					if (speed !== undefined) {
						scalingSpeedY = speed;
					}
					if (accel !== undefined) {
						scalingAccelY = accel;
					}
					if (maxSpeed !== undefined) {
						maxScalingSpeedY = maxSpeed;
					}
				}
				
				scaleEndHandler = _scaleEndHandler;
			}
		};

		let stuckLeft = self.stuckLeft = () => {
			isStuckLeft = true;
		};

		let unstuckLeft = self.unstuckLeft = () => {
			isStuckLeft = false;
		};

		let stuckRight = self.stuckRight = () => {
			isStuckRight = true;
		};

		let unstuckRight = self.unstuckRight = () => {
			isStuckRight = false;
		};

		let stuckUp = self.stuckUp = () => {
			isStuckUp = true;
		};

		let unstuckUp = self.unstuckUp = () => {
			isStuckUp = false;
		};

		let stuckDown = self.stuckDown = () => {
			isStuckDown = true;
		};

		let unstuckDown = self.unstuckDown = () => {
			isStuckDown = false;
		};

		let rotate = self.rotate = (speedOrParams) => {
			//REQUIRED: speedOrParams
			//OPTIONAL: speedOrParams.speed
			//OPTIONAL: speedOrParams.accel
			//OPTIONAL: speedOrParams.minSpeed
			//OPTIONAL: speedOrParams.maxSpeed

			if (CHECK_IS_DATA(speedOrParams) === true) {

				if (speedOrParams.speed !== undefined) {
					rotationSpeed = speedOrParams.speed;
				}

				if (speedOrParams.accel !== undefined) {
					rotationAccel = speedOrParams.accel;
				}

				if (speedOrParams.minSpeed !== undefined) {
					minRotationSpeed = speedOrParams.minSpeed;
				}

				if (speedOrParams.maxSpeed !== undefined) {
					maxRotationSpeed = speedOrParams.maxSpeed;
				}
			} else {
				rotationSpeed = speedOrParams;
			}
		};

		let stopRotation = self.stopRotation = (accel) => {
			//OPTIONAL: accel

			if (accel !== undefined) {
				rotationAccel = -accel;
				if (accel > 0) {
					minRotationSpeed = 0;
				} else if (accel < 0) {
					maxRotationSpeed = 0;
				}
			} else if (rotationSpeed > 0) {
				rotationSpeed = 0;
			}
		};

		let rotateTo = self.rotateTo = (params, _rotateEndHandler) => {
			//REQUIRED: params
			//REQUIRED: params.toAngle
			//OPTIONAL: params.speed
			//OPTIONAL: params.accel
			//OPTIONAL: params.minSpeed
			//OPTIONAL: params.maxSpeed
			//OPTIONAL: rotateEndHandler

			toAngle = params.toAngle;

			if (params.speed !== undefined) {
				rotationSpeed = params.speed;
			}

			if (params.accel !== undefined) {
				rotationAccel = params.accel;
			}

			if (params.minSpeed !== undefined) {
				minRotationSpeed = params.minSpeed;
			}

			if (params.maxSpeed !== undefined) {
				maxRotationSpeed = params.maxSpeed;
			}
			
			rotateEndHandler = _rotateEndHandler;
		};

		let fadeIn = self.fadeIn = (speedOrParams, _fadeEndHandler) => {
			//OPTIONAL: speedOrParams
			//OPTIONAL: speedOrParams.speed
			//OPTIONAL: speedOrParams.accel
			//OPTIONAL: speedOrParams.maxSpeed
			//OPTIONAL: fadeEndHandler
			
			if (alpha === 1) {
				alpha = 0;
			}
			toAlpha = 1;

			if (speedOrParams === undefined) {
				fadingSpeed = 2;
			}
			
			else if (CHECK_IS_DATA(speedOrParams) === true) {

				if (speedOrParams.speed !== undefined) {
					fadingSpeed = speedOrParams.speed;
				}

				if (speedOrParams.accel !== undefined) {
					fadingAccel = speedOrParams.accel;
				}

				if (speedOrParams.maxSpeed !== undefined) {
					maxFadingSpeed = speedOrParams.maxSpeed;
				}
			}
			
			else if (isNaN(speedOrParams) === true) {
				_fadeEndHandler = speedOrParams;
				fadingSpeed = 2;
			}
			
			else {
				fadingSpeed = speedOrParams;
			}
			
			fadeEndHandler = _fadeEndHandler;
		};

		let fadeOut = self.fadeOut = (speedOrParams, _fadeEndHandler) => {
			//OPTIONAL: speedOrParams
			//OPTIONAL: speedOrParams.speed
			//OPTIONAL: speedOrParams.accel
			//OPTIONAL: speedOrParams.maxSpeed
			//OPTIONAL: fadeEndHandler
			
			toAlpha = 0;

			if (speedOrParams === undefined) {
				fadingSpeed = -2;
			}
			
			else if (CHECK_IS_DATA(speedOrParams) === true) {

				if (speedOrParams.speed !== undefined) {
					fadingSpeed = -speedOrParams.speed;
				}

				if (speedOrParams.accel !== undefined) {
					fadingAccel = -speedOrParams.accel;
				}

				if (speedOrParams.maxSpeed !== undefined) {
					minFadingSpeed = -speedOrParams.maxSpeed;
				}
			}
			
			else if (isNaN(speedOrParams) === true) {
				_fadeEndHandler = speedOrParams;
				fadingSpeed = -2;
			}
			
			else {
				fadingSpeed = -speedOrParams;
			}
			
			fadeEndHandler = _fadeEndHandler;
		};

		let stopFading = self.stopFading = (accel) => {
			//OPTIONAL: accel

			if (accel !== undefined) {
				fadingAccel = -accel;
				if (accel > 0) {
					minFadingSpeed = 0;
				} else if (accel < 0) {
					maxFadingSpeed = 0;
				}
			} else if (fadingSpeed > 0) {
				fadingSpeed = 0;
			}
		};

		let fadeTo = self.fadeTo = (params, _fadeEndHandler) => {
			//REQUIRED: params
			//REQUIRED: params.toAlpha
			//OPTIONAL: params.speed
			//OPTIONAL: params.accel
			//OPTIONAL: params.minSpeed
			//OPTIONAL: params.maxSpeed
			//OPTIONAL: fadeEndHandler

			toAlpha = params.toAlpha;

			if (params.speed !== undefined) {
				fadingSpeed = params.speed;
			}

			if (params.accel !== undefined) {
				fadingAccel = params.accel;
			}

			if (params.minSpeed !== undefined) {
				minFadingSpeed = params.minSpeed;
			}

			if (params.maxSpeed !== undefined) {
				maxFadingSpeed = params.maxSpeed;
			}
			
			fadeEndHandler = _fadeEndHandler;
		};

		let checkIsHiding = self.checkIsHiding = () => {
			return isHiding;
		};

		let checkIsShowing = self.checkIsShowing = () => {
			return isHiding !== true;
		};



		let onMeet = self.onMeet = (target, handler) => {

			collisionTargets.push(target);

			if (meetHandlerMap[target.id] === undefined) {
				meetHandlerMap[target.id] = [];
			}

			meetHandlerMap[target.id].push(handler);

			checkAllCollisions();
		};

		let offMeet = self.offMeet = (target, handler) => {

			if (handler === undefined) {
				delete meetHandlerMap[target.id];
			} else {
				REMOVE({
					array: meetHandlerMap[target.id],
					value: handler
				});
			}
		};

		let runMeetHandlers = self.runMeetHandlers = (target, realTarget) => {
			
			let meetHandlers = meetHandlerMap[target.id];

			if (meetHandlers !== undefined) {

				for (let i = 0; i < meetHandlers.length; i += 1) {
					meetHandlers[i](realTarget);
				}
			}
		};

		let onPart = self.onPart = (target, handler) => {

			collisionTargets.push(target);

			if (partHandlerMap[target.id] === undefined) {
				partHandlerMap[target.id] = [];
			}

			partHandlerMap[target.id].push(handler);
		};

		let offPart = self.offPart = (target, handler) => {

			if (handler === undefined) {
				delete partHandlerMap[target.id];
			} else {
				REMOVE({
					array: partHandlerMap[target.id],
					value: handler
				});
			}
		};

		let runPartHandlers = self.runPartHandlers = (target, realTarget) => {

			let partHandlers = partHandlerMap[target.id];

			if (partHandlers !== undefined) {

				for (let i = 0; i < partHandlers.length; i += 1) {
					partHandlers[i](realTarget);
				}
			}
		};

		let addTouchArea = self.addTouchArea = (touchArea) => {
			//REQUIRED: touchArea
			
			if (areaGraphics !== undefined) {
				areaGraphics.lineStyle(1, 0xFF00FF);
				touchArea.drawArea(areaGraphics);
			}

			touchAreas.push(touchArea);
			touchArea.setTarget(self);
			
			touchArea.on('remove', () => {
				
				REMOVE({
					array : touchAreas,
					value : touchArea
				});
			});
		};

		let getTouchAreas = self.getTouchAreas = () => {
			return touchAreas;
		};

		let getTouchArea = self.getTouchArea = () => {
			return touchAreas[0];
		};
		
		let addCollider = self.addCollider = (collider) => {
			//REQUIRED: collider
			
			if (areaGraphics !== undefined) {
				areaGraphics.lineStyle(1, 0x00FF00);
				collider.drawArea(areaGraphics);
			}

			colliders.push(collider);
			collider.setTarget(self);
			
			collider.on('remove', () => {
				
				REMOVE({
					array : colliders,
					value : collider
				});
			});
		};

		let getColliders = self.getColliders = () => {
			return colliders;
		};
		

		let checkAllCollisions = () => {
			
			for (let i = 0; i < collisionTargets.length; i += 1) {
				let target = collisionTargets[i];
				
				if (target.type === CLASS) {
					
					let registeredNodes = SkyEngine.Screen.findNodesByClass(target);
					
					for (let j = 0; j < registeredNodes.length; j += 1) {
						let realTarget = registeredNodes[j];
						
						if (realTarget !== self) {

							if (realTarget.checkIsRemoved() !== true) {

								if (
									(
										checkIsToCheckCollision() === true || realTarget.checkIsToCheckCollision() === true || (
											(maxCollisionWidth === undefined || Math.abs(realX - realTarget.getRealX()) < maxCollisionWidth) &&
											(maxCollisionHeight === undefined || Math.abs(realY - realTarget.getRealY()) < maxCollisionHeight)
										)
									) &&
									(self.checkOneSideCollision(realTarget) === true || (self.type !== realTarget.type && realTarget.checkOneSideCollision(self) === true))
								) {

									if (isRemoved !== true) {
										collidingNodeIds[realTarget.id] = true;

										runMeetHandlers(target, realTarget);
									}
								}
								
								else if (isRemoved !== true && collidingNodeIds[realTarget.id] !== undefined) {
									delete collidingNodeIds[realTarget.id];

									runPartHandlers(target, realTarget);
								}
								
							} else {
								delete collidingNodeIds[realTarget.id];
							}
						}
					}
				}
				
				else if (target.checkIsRemoved() !== true) {

					if (
						(
							checkIsToCheckCollision() === true || target.checkIsToCheckCollision() === true || (
								(maxCollisionWidth === undefined || Math.abs(realX - target.getRealX()) < maxCollisionWidth) &&
								(maxCollisionHeight === undefined || Math.abs(realY - target.getRealY()) < maxCollisionHeight)
							)
						) &&
						(self.checkOneSideCollision(target) === true || (self.type !== target.type && target.checkOneSideCollision(self) === true))
					) {

						if (collidingNodeIds[target.id] === undefined) {
							collidingNodeIds[target.id] = true;

							runMeetHandlers(target, target);
						}
					}
					
					else if (collidingNodeIds[target.id] !== undefined) {
						delete collidingNodeIds[target.id];

						runPartHandlers(target, target);
					}
				}
				
				else {

					collisionTargets.splice(i, 1);
					i -= 1;

					delete collidingNodeIds[target.id];
					delete meetHandlerMap[target.id];
					delete partHandlerMap[target.id];
				}
				
				if (collisionTargets === undefined) {
					break;
				}
			}
		};

		let drawArea = self.drawArea = (graphics) => {
			//REQUIRED: graphics
			
			let children = self.getChildren();
			
			for (let i = 0; i < children.length; i += 1) {
				children[i].drawArea(graphics);
			}
		};
		
		let pause = self.pause = () => {
			pauseCount += 1;
		};
		
		let checkIsPaused = self.checkIsPaused = () => {
			return pauseCount > 0;
		};
		
		let resume = self.resume = () => {
			
			pauseCount -= 1;
			
			if (pauseCount < 0) {
				pauseCount = 0;
			}
		};
		
		let checkIsToCheckCollision = self.checkIsToCheckCollision = () => {
			return isToCheckCollision;
		};
		
		let delay = self.delay = (seconds, func) => {
			
			let _delay = SkyEngine.Delay(seconds, func);
			
			on('remove', () => {
				_delay.remove();
				_delay = undefined;
			});
			
			return _delay;
		};
		
		let interval = self.interval = (seconds, func) => {
			
			let _interval = SkyEngine.Interval(seconds, func);
			
			on('remove', () => {
				_interval.remove();
				_interval = undefined;
			});
			
			return _interval;
		};

		genRealProperties();
		
		// 개발 모드에서는 중점 및 영역 표시
		if (BROWSER_CONFIG.SkyEngine.isDebugMode === true) {
			
			areaGraphics = new PIXI.Graphics();
			
			// 중점을 그립니다.
			areaGraphics.lineStyle(1, 0x00FFFF);
			areaGraphics.drawRect(-1, -1, 2, 2);
			
			areaGraphics.moveTo(-15, 0);
			areaGraphics.lineTo(15, 0);
			areaGraphics.moveTo(0, -15);
			areaGraphics.lineTo(0, 15);
			
			// 터치 영역을 그립니다.
			let touchAreas = self.getTouchAreas();
			
			areaGraphics.lineStyle(1, 0xFF00FF);
			
			for (let i = 0; i < touchAreas.length; i += 1) {
				touchAreas[i].drawArea(areaGraphics);
			}
			
			// 충돌 영역을 그립니다.
			let colliders = self.getColliders();
			
			areaGraphics.lineStyle(1, 0x00FF00);
			
			for (let i = 0; i < colliders.length; i += 1) {
				colliders[i].drawArea(areaGraphics);
			}
			
			areaGraphics.zIndex = 9999999;
			
			addToPixiContainer(areaGraphics);
		}
	},