/*
 * 배경 노드
 */
SkyEngine.Background = CLASS({
	
	preset : () => {
		return SkyEngine.FixedNode;
	},
	
	init : (inner, self, params) => {
		//REQUIRED: params
		//REQUIRED: params.src
		//OPTIONAL: params.isNotToRepeatX
		//OPTIONAL: params.isNotToRepeatY
		//OPTIONAL: params.leftMargin
		//OPTIONAL: params.rightMargin
		//OPTIONAL: params.topMargin
		//OPTIONAL: params.bottomMargin
		
		let src = params.src;
		let isNotToRepeatX = params.isNotToRepeatX;
		let isNotToRepeatY = params.isNotToRepeatY;
		let leftMargin = params.leftMargin;
		let rightMargin = params.rightMargin;
		let topMargin = params.topMargin;
		let bottomMargin = params.bottomMargin;
		
		if (leftMargin === undefined) {
			leftMargin = 0;
		}
		if (rightMargin === undefined) {
			rightMargin = 0;
		}
		if (topMargin === undefined) {
			topMargin = 0;
		}
		if (bottomMargin === undefined) {
			bottomMargin = 0;
		}
		
		let width;
		let height;
		
		let pixiTilingSprite;
		let pixiSprites;
		
		let draw = () => {
			
			let screenX = (SkyEngine.Screen.getCameraFollowX() - SkyEngine.Screen.getX() - SkyEngine.Screen.getStageX()) / realScaleX;
			let screenY = (SkyEngine.Screen.getCameraFollowY() - SkyEngine.Screen.getY() - SkyEngine.Screen.getStageY()) / realScaleY;
			
			let halfScreenWidth = SkyEngine.Screen.getWidth() / 2 / realScaleX;
			let halfScreenHeight = SkyEngine.Screen.getHeight() / 2 / realScaleY;
			
			let realX = self.getX() / realScaleX;
			let realY = self.getY() / realScaleY;
			
			if (isNotToRepeatX === true && isNotToRepeatY === true) {
				
				if (pixiSprites.length === 0) {
					
					let pixiSprite = new PIXI.Sprite.from(src);
					
					pixiSprite.anchor.x = 0.5;
					pixiSprite.anchor.y = 0.5;
					
					pixiSprite.x = -SkyEngine.Screen.getStageX() / realScaleX / 2;
					pixiSprite.y = -SkyEngine.Screen.getStageY() / realScaleY / 2;
					
					pixiSprite.zIndex = -9999999;
					
					pixiSprite.blendMode = SkyEngine.Util.BlendMode.getPixiBlendMode(self.getBlendMode());
					
					pixiSprites.push(pixiSprite);
					
					self.addToPixiContainer(pixiSprite);
				}
			}
			
			else if (isNotToRepeatX === true) {
				
				let _y = 0;
				
				// 화면 밖으로 벗어난 스프라이트 제거
				for (let i = 0; i < pixiSprites.length; i += 1) {
					
					let pixiSprite = pixiSprites[i];
					
					if (
					pixiSprite.y + realY < screenY - halfScreenHeight - ys ||
					pixiSprite.y + realY > screenY + halfScreenHeight) {
						self.removeFromPixiContainer(pixiSprite);
						pixiSprites.splice(i, 1);
						i -= 1;
					}
				}
				
				while (screenY - halfScreenHeight < _y + realY) {
					_y -= ys;
				}
				
				while (_y + realY < screenY + halfScreenHeight + ys) {
					
					let existed;
					
					let stageY = SkyEngine.Screen.getStageY() / realScaleY / 2;
					
					for (let i = 0; i < pixiSprites.length; i += 1)  {
						
						let pixiSprite = pixiSprites[i];
						
						if (pixiSprite.y === _y - stageY) {
							existed = true;
						}
					}
					
					// 스프라이트 생성
					if (existed !== true) {
						
						let pixiSprite = new PIXI.Sprite.from(src);
						
						pixiSprite.anchor.x = 0.5;
						pixiSprite.anchor.y = 0.5;
						
						pixiSprite.x = -SkyEngine.Screen.getStageX() / realScaleX / 2;
						pixiSprite.y = _y - stageY;
						pixiSprite.zIndex = -9999999;
						
						pixiSprite.blendMode = SkyEngine.Util.BlendMode.getPixiBlendMode(self.getBlendMode());
						
						pixiSprites.push(pixiSprite);
						
						self.addToPixiContainer(pixiSprite);
					}
					
					_y += ys;
				}
			}
			
			else if (isNotToRepeatY === true) {
				
				let _x = 0;
				
				// 화면 밖으로 벗어난 스프라이트 제거
				for (let i = 0; i < pixiSprites.length; i += 1) {
					
					let pixiSprite = pixiSprites[i];
					
					if (
					pixiSprite.x + realX < screenX - halfScreenWidth - xs ||
					pixiSprite.x + realX > screenX + halfScreenWidth) {
						self.removeFromPixiContainer(pixiSprite);
						pixiSprites.splice(i, 1);
						i -= 1;
					}
				}
				
				while (screenX - halfScreenWidth < _x + realX) {
					_x -= xs;
				}
				
				while (_x + realX < screenX + halfScreenWidth + xs) {
					
					let existed;
					
					let stageX = SkyEngine.Screen.getStageX() / realScaleX / 2;
					
					for (let i = 0; i < pixiSprites.length; i += 1)  {
						
						let pixiSprite = pixiSprites[i];
						
						if (pixiSprite.x === _x - stageX) {
							existed = true;
						}
					}
					
					// 스프라이트 생성
					if (existed !== true) {
						
						let pixiSprite = new PIXI.Sprite.from(src);
						
						pixiSprite.anchor.x = 0.5;
						pixiSprite.anchor.y = 0.5;
						
						pixiSprite.x = _x - stageX;
						pixiSprite.y = -SkyEngine.Screen.getStageY() / realScaleY / 2;
						pixiSprite.zIndex = -9999999;
						
						pixiSprite.blendMode = SkyEngine.Util.BlendMode.getPixiBlendMode(self.getBlendMode());
						
						pixiSprites.push(pixiSprite);
						
						self.addToPixiContainer(pixiSprite);
					}
					
					_x += xs;
				}
			}
			
			else {
				
				let _x = 0;
				let _y = 0;
				
				// 화면 밖으로 벗어난 스프라이트 제거
				for (let i = 0; i < pixiSprites.length; i += 1) {
					
					let pixiSprite = pixiSprites[i];
					
					if (
					pixiSprite.x + realX < screenX - halfScreenWidth ||
					pixiSprite.y + realY < screenY - halfScreenHeight ||
					pixiSprite.x + realX > screenX + halfScreenWidth ||
					pixiSprite.y + realY > screenY + halfScreenHeight) {
						self.removeFromPixiContainer(pixiSprite);
						pixiSprites.splice(i, 1);
						i -= 1;
					}
				}
				
				while (screenX - halfScreenWidth < _x + realX) {
					_x -= xs;
				}
				
				while (screenY - halfScreenHeight < _y + realY) {
					_y -= ys;
				}
				
				while (_y + realY < screenY + halfScreenHeight + ys) {
					
					let _x2 = _x;
					
					while (_x2 + realX < screenX + halfScreenWidth + xs) {
						
						let existed;
						
						let stageX = SkyEngine.Screen.getStageX() / realScaleX / 2;
						let stageY = SkyEngine.Screen.getStageY() / realScaleY / 2;
						
						for (let i = 0; i < pixiSprites.length; i += 1)  {
							
							let pixiSprite = pixiSprites[i];
							
							if (pixiSprite.x === _x2 - stageX && pixiSprite.y === _y - stageY) {
								existed = true;
							}
						}
						
						// 스프라이트 생성
						if (existed !== true) {
							
							let pixiSprite = new PIXI.Sprite.from(src);
							
							pixiSprite.anchor.x = 0.5;
							pixiSprite.anchor.y = 0.5;
							
							pixiSprite.x = _x2 - stageX;
							pixiSprite.y = _y - stageY;
							pixiSprite.zIndex = -9999999;
							
							pixiSprite.blendMode = SkyEngine.Util.BlendMode.getPixiBlendMode(self.getBlendMode());
							
							pixiSprites.push(pixiSprite);
							
							self.addToPixiContainer(pixiSprite);
						}
						
						_x2 += xs;
					}
					
					_y += ys;
				}
			}
		};
		
		SkyEngine.LoadTexture(src, (texture) => {
			
			if (self.checkIsRemoved() !== true) {
				
				width = texture.width;
				height = texture.height;
				
				if (isNotToRepeatX !== true && isNotToRepeatY !== true && leftMargin === 0 && rightMargin === 0 && topMargin === 0 && bottomMargin === 0) {
					
					let realScaleX = SkyEngine.Screen.getRealScaleX() * self.getRealScaleX();
					let realScaleY = SkyEngine.Screen.getRealScaleY() * self.getRealScaleY();
					
					let screenX = (SkyEngine.Screen.getCameraFollowX() - SkyEngine.Screen.getX() - SkyEngine.Screen.getStageX()) / realScaleX;
					let screenY = (SkyEngine.Screen.getCameraFollowY() - SkyEngine.Screen.getY() - SkyEngine.Screen.getStageY()) / realScaleY;
					
					let screenWidth = SkyEngine.Screen.getWidth() / realScaleX;
					let screenHeight = SkyEngine.Screen.getHeight() / realScaleY;
					
					let realX = self.getX() / realScaleX;
					let realY = self.getY() / realScaleY;
					
					pixiTilingSprite = new PIXI.TilingSprite(texture, screenWidth, screenHeight);
					
					pixiTilingSprite.anchor.x = 0.5;
					pixiTilingSprite.anchor.y = 0.5;
					
					pixiTilingSprite.x = -realX + screenX;
					pixiTilingSprite.y = -realY + screenY;
					
					pixiTilingSprite.tilePosition.x = (screenWidth - width - SkyEngine.Screen.getStageX() / realScaleX) / 2;
					pixiTilingSprite.tilePosition.y = (screenHeight - height - SkyEngine.Screen.getStageY() / realScaleY) / 2;
					
					pixiTilingSprite.zIndex = -9999999;
					
					pixiTilingSprite.blendMode = SkyEngine.Util.BlendMode.getPixiBlendMode(self.getBlendMode());
					
					self.addToPixiContainer(pixiTilingSprite);
				}
				
				else {
					pixiSprites = [];
					draw();
				}
				
				DELAY(() => {
					if (self.checkIsRemoved() !== true) {
						self.fireEvent('load');
					}
				});
			}
		});
		
		let step;
		OVERRIDE(self.step, (origin) => {
			
			step = self.step = (deltaTime) => {
				
				origin(deltaTime);
				
				if (pixiTilingSprite !== undefined) {
					
					let realScaleX = SkyEngine.Screen.getRealScaleX() * self.getRealScaleX();
					let realScaleY = SkyEngine.Screen.getRealScaleY() * self.getRealScaleY();
					
					let screenX = (SkyEngine.Screen.getCameraFollowX() - SkyEngine.Screen.getX() - SkyEngine.Screen.getStageX()) / realScaleX;
					let screenY = (SkyEngine.Screen.getCameraFollowY() - SkyEngine.Screen.getY() - SkyEngine.Screen.getStageY()) / realScaleY;
					
					let screenWidth = SkyEngine.Screen.getWidth() / realScaleX;
					let screenHeight = SkyEngine.Screen.getHeight() / realScaleY;
					
					let realX = self.getX() / realScaleX;
					let realY = self.getY() / realScaleY;
					
					pixiTilingSprite.width = screenWidth;
					pixiTilingSprite.height = screenHeight;
					
					pixiTilingSprite.x = -realX + screenX;
					pixiTilingSprite.y = -realY + screenY;
					
					pixiTilingSprite.tilePosition.x = (screenWidth - width - SkyEngine.Screen.getStageX() / realScaleX) / 2 - pixiTilingSprite.x;
					pixiTilingSprite.tilePosition.y = (screenHeight - height - SkyEngine.Screen.getStageY() / realScaleY) / 2 - pixiTilingSprite.y;
				}
				
				else if (pixiSprites !== undefined) {
					draw();
				}
			};
		});